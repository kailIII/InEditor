/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([], function() {
  'use strict';

  /**
   * @class CellBoundaryProperty
   */
  function CellBoundaryProperty(id) {

    /**
     * @memberof CellBoundaryProperty
     */
    this.id = id;

    /**
     * @memberof CellBoundaryProperty
     */
    this.name = id;

    /**
     * @memberof CellBoundaryProperty
     */
    this.description = "";

    /**
     * @memberof CellBoundaryProperty
     */
    this.duality = "";

    /**
     * @memberof CellBoundaryProperty
     */
    this.externalReference = [];

  }

  /**
   * @memberof CellBoundaryProperty
   */
  CellBoundaryProperty.prototype.load = function(values) {

    this.id = values.id;
    this.name = values.name;
    this.description = values.description;
    this.duality = values.duality;
    this.externalReference = values.externalReference;

  }

  return CellBoundaryProperty;
});
