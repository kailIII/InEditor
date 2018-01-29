/**
 * @author suheeeee <lalune1120@hotmaile.com>
 */

define([
  "./ProjectEventHandler.js",
  "./DrawEventHandler.js",
  "./PropertyEventHandler.js",
  "./UIChangeEventHandler.js"
], function(
  ProjectEventHandler,
  DrawEventHandler,
  PropertyEventHandler,
  UIChangeEventHandler
) {
  'use strict';

  /**
   * @exports EventHandler
   */
  function EventHandler() {

    this.handlers = [];
    this.handlerBinder = [];

    this.init();
  }

  EventHandler.prototype.init = function() {

    this.add();
    this.setHandlerBinder();
    this.btnEvnetBind();

  }

  EventHandler.prototype.add = function() {

    this.handlers['drawEventHandler'] = new DrawEventHandler();
    this.handlers['propertyEventHandler'] = new PropertyEventHandler();
    this.handlers['projectEventHandler'] = new ProjectEventHandler();
    this.handlers['uiChangeEventHandler'] = new UIChangeEventHandler();

  }

  EventHandler.prototype.btnEvnetBind = function() {

    for (var key in this.handlerBinder) {
      for (var subkey in this.handlerBinder[key]) {

        if (subkey == 'click' && document.getElementById(key) != null) {

          // event on html ui element
          document.getElementById(key).addEventListener('click', function(event) {
            window.eventHandler.callHandler('html', event);
          });

        } else if (subkey == 'fancytreeclick') {

          $("#tree-view").fancytree({
            click: function(event, data) {
              window.eventHandler.callHandler('tree', event, data)
            }
          });

        } else if ( subkey == 'wheel' ){

          window.addEventListener('wheel', function(event, data){

            if(event.target.tagName == 'CANVAS'){
              window.eventHandler.callHandler('canvas', event);
            }

          });

        } else if ( subkey == 'onchange' && document.getElementById(key) != null){
          // document.getElementById(key).addEventListener('onchange', function(event){
          //   console.log(window.getElementById(key));
          //   window.eventHandler.callHandler('html', event)
          // });
        }
      }
    }

  }

  /**
   * @desc This function must called after add new floor and bind event handler to events on new stage.
   * @param _id id of new floor
   */
  EventHandler.prototype.stageEventBind = function(_id) {

    for (var key in this.handlerBinder) {
      for (var subkey in this.handlerBinder[key]) {
        if (subkey == 'contentClick') { // event on canvas

          var stage = window.storage.canvasContainer.getElementById('stage', _id);

          stage.stage.on(
            'contentClick',
            function(event) {
              window.eventHandler.callHandler('stage', event)
            });
        }
      }
    }
  }

  EventHandler.prototype.setHandlerBinder = function() {

    for (var key in this.handlers) {
      this.handlers[key].setHandlerBinder(this.handlerBinder);
    }

  }


  /**
   * @param {String} _target html, stage, tree
   * @param {Object} _event
   * @param {Object} _data
   */
  EventHandler.prototype.callHandler = function(_target, _event, _data) {

    var target;
    var type;
    var message;
    var data;

    if(_target == 'html'){
      target = _event.target.id;
      type = _event.type;

    }else if(_target == 'stage'){
      target = _event.currentTarget.attrs.id;
      type = _event.type;

    }else if(_target == 'tree'){
      target = _event.target.id;
      type = _event.type;
      data = _data;

    } else if(_target == 'canvas'){
      target = 'canvas';
      type = _event.type;
      data = _event;
    } else if(_target == 'file'){
      target = 'floorplan-file';
      type = _event.type;
      data = _event;
    }

    var result = this.handlerBinder[target][type](window.broker, window.broker.previousMsg, data);

    if ( result.result ) {
      window.broker.previousMsg = result.msg;
    } else {
      console.log("error! " + result.msg);
    }

  }


  return EventHandler;
});
