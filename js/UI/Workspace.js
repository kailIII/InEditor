/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([], function() {
  'use strict';

  /**
   * @class Workspace
   */
  function Workspace() {

    this.init();

  }

  /**
  * @memberof Workspace
  */
  Workspace.prototype.init = function(){

    // init
      var config = {
        content: [{
          type: 'stack'
        }]
      };

    this.workspaceLayout = new GoldenLayout(config, $('#workspace-layout-container'));

    this.workspaceLayout.registerComponent('workspace', function(container, state) {
      // container.getElement().html(viewport);
    });

    this.workspaceLayout.init();

    $(window).resize(function() {
      window.uiContainer.resize();

    });


  }

  /**
  * @memberof Workspace
  */
  Workspace.prototype.addNewWorkspace = function(_id, _name) {

    var newItemConfig = {
      title: _name,
      type: 'component',
      componentName: 'workspace',
      id: _id
    };

    if(window.uiContainer.workspace.workspaceLayout.root.contentItems.length == 0){

      this.init();


    }

    var contentItems = window.uiContainer.workspace.workspaceLayout.root.contentItems[0];
    contentItems.addChild(newItemConfig);

    var index = contentItems.contentItems.length - 1;
    contentItems.contentItems[index].element[0].id = _id;

    var viewport = "<div class=\"Panel\" id=\"viewport\" style=\"position:absoulte;\"><div id=" + _id + " class=\"container\"></div></div>";
    contentItems.contentItems[index].element[0].innerHTML = viewport;


    $(window).resize(function() {
      window.uiContainer.resize();
    });

  }

  /**
  * @memberof Workspace
  * @param {String} id floor id
  */
  Workspace.prototype.activateWorkspace = function(id){

    var tabs = window.uiContainer.workspace.workspaceLayout.root.contentItems[0].header.tabs;

    var index = 0;
    while( tabs[index].contentItem.config.id != id){

      index++;

    }

    window.uiContainer.workspace.workspaceLayout.root.contentItems[0].setActiveContentItem(window.uiContainer.workspace.workspaceLayout.root.contentItems[0].contentItems[index]);
    window.uiContainer.workspace.workspaceLayout.root.contentItems[0].header.setActiveContentItem(tabs[index].contentItem);

  }

  /**
  * @memberof Workspace
  */
  Workspace.prototype.destroy = function(condition){

    window.uiContainer.workspace.workspaceLayout.destroy();

  }

  Workspace.prototype.deleteFirstWorkspace = function(){

    var childerens = window.uiContainer.workspace.workspaceLayout.root.contentItems[0].contentItems;
    window.uiContainer.workspace.workspaceLayout.root.contentItems[0].removeChild(childerens[0], false);

  }

  /**
  * @memberof Workspace
  */
  Workspace.prototype.getActivatedWorkspace = function(){
    var items = this.workspaceLayout.root.contentItems;
    var result = [];

    if(this.workspaceLayout.root.contentItems.length == 0) return -1;

    for ( var i in items ){
        for(var j in items[i].contentItems){
          if(! items[i].contentItems[j].container.isHidden) result.push(items[i].contentItems[j].config.title);
        }
    }

    return result;
  }

  Workspace.prototype.deleteFirstWorkspace = function(){

    var childerens = window.uiContainer.workspace.workspaceLayout.root.contentItems[0].contentItems;
    window.uiContainer.workspace.workspaceLayout.root.contentItems[0].removeChild(childerens[0], false);

  }

  return Workspace;

});
