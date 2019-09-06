/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"TV/Timesheet_Visulization/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});