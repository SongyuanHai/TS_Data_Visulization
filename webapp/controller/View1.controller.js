/* global XLSX:true */
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/m/MessageToast',
	'../lib/xlsx',
], function (Controller, MessageToast, XLSXJS) {
	"use strict";

	return Controller.extend("TV.Timesheet_Visulization.controller.View1", {
		onInit: function () {
			var oFileUploader = this.byId("fileUploader");
			//Set File type for uploaded file
			oFileUploader.setFileType = ["xls", "xlsx"];
		},
		handleUploadPress: function (e) {

			//console.log(oFileUploader);
			var msg = 'File uploaded!';
			MessageToast.show(msg);
			this._import($.sap.oFile);
		},
		onChangeFUP: function (e) {
			$.sap.oFile = e.getParameter("files") && e.getParameter("files")[0];
			//this._import(e.getParameter("files") && e.getParameter("files")[0]);
		},
		_import: function (file) {
			if (file && window.FileReader) {
				var reader = new FileReader();
				var result = {},
					data;
				reader.onload = function (e) {
					data = e.target.result;
					var wb = XLSX.read(data, {
						type: 'binary'
					});

					wb.SheetNames.forEach(function (sheetName) {
						var roa = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
						if (roa.length > 0) {
							result[sheetName] = roa;
						}
					});
					console.log(result);
					return result;

				};

				reader.readAsBinaryString(file);

			}
		},

	});
});