/*global QUnit*/

sap.ui.define([
	"zgate_entry/controller/FirstScreen.controller"
], function (Controller) {
	"use strict";

	QUnit.module("FirstScreen Controller");

	QUnit.test("I should test the FirstScreen controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
