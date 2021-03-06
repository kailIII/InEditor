/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([
  "./Result.js",
  "../PubSub/Message.js"
], function(
  Result,
  Message
) {
  'use strict';

  /**
   * @class ExportEventHandler
   */
  function ExportEventHandler() {

  }

  ExportEventHandler.prototype.setHandlerBinder = function(handlerBinder) {

    handlerBinder['viewer-modal-btn'] = {
      'click': this.exportToViewer
    };

    handlerBinder['viewer-factory-btn'] = {
      'click': this.exportToFactory
    };

  }

  ExportEventHandler.prototype.exportToViewer = function(broker, previousMsg) {

    var result = new Result();
    var address = document.getElementById("viewer-baseURL").value+ ":" + document.getElementById("viewer-portNum").value + "/" +document.getElementById("viewer-params").value;
    var reg = /https?:\/\/(\w*:\w*@)?[-\w.]+(:\d+)?(\/([\w/_.]*(\?\S+)?)?)?/.exec(address);


    if(reg[0] == address){

      if (broker.isPublishable('exporttoviewer')) {
        broker.publish(new Message('exporttoviewer', {
          'address': address
        }));
        result.result = true;
        result.msg = null;
      } else {
        result.msg = "wrong state transition : " + previousMsg + " to exporttojson.";
      }

    }



    return result;

  }

  ExportEventHandler.prototype.exportToFactory = function(broker, previousMsg) {

    var result = new Result();

    if (broker.isPublishable('exporttofactory')) {
      broker.publish(new Message('exporttofactory', {
        baseURL: window.document.getElementById('factory-baseURL').value + ":" + window.document.getElementById('factory-portNum').value
      }));
      result.result = true;
      result.msg = null;
    } else {
      result.msg = "wrong state transition : " + previousMsg + " to exporttojson.";
    }

    return result;

  }

  return ExportEventHandler;
});
