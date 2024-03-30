sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    'sap/m/MessageToast',
    "sap/m/Text",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, UIComponent, MessageToast, Text, MessageBox) {
        "use strict";

        return Controller.extend("zgateentry.controller.FirstScreen", {
            onInit: function () {
                var obj = {
                    "aGateInOutVisibleorNot": false,
                }
                this.getView().setModel(new sap.ui.model.json.JSONModel(obj), "oGateInOutVisibleModel");
                var obj = {
                    "aGateNumberEditableorNot": false,
                }
                this.getView().setModel(new sap.ui.model.json.JSONModel(obj), "oGateNumberEditableModel");
                var CurrentDate = new Date()
                var dt1 = Number(CurrentDate.getDate());
                var DT1 = dt1 < 10 ? "0" + dt1 : dt1;
                var mm1 = Number(CurrentDate.getMonth() + 1);
                var MM1 = mm1 < 10 ? "0" + mm1 : mm1;
                // var CurrentDate1 = CurrentDate.getFullYear() + '-' + MM1 + '-' + DT1;
                var CurrentDate1 = DT1 + '-' + MM1 + '-' + CurrentDate.getFullYear();
                this.getView().byId("CreatedOn").setValue(CurrentDate1);
                this.getView().setModel(new sap.ui.model.json.JSONModel, "oPlantDataModel");
                var aPlantArr = [
                    { "Plant": "1000", "PlantName": "Common Sudiva Plant", },
                    { "Plant": "1101", "PlantName": "Open End Plant (Spinning)", },
                    { "Plant": "1111", "PlantName": "Ring Frame Plant 1 (Spinning)", },
                    { "Plant": "1112", "PlantName": "Ring Frame Plant 2 (Spinning)", },
                    { "Plant": "1113", "PlantName": "Ring Frame Plant 3 (Spinning)", },
                    { "Plant": "1301", "PlantName": "Knitting Plant", },
                    { "Plant": "1901", "PlantName": "Solar Power Plant", },
                    { "Plant": "2901", "PlantName": "Solar Power Plant", },
                ]
                this.getView().getModel("oPlantDataModel").setProperty("/aPlantData", aPlantArr);
                UIComponent.getRouterFor(this).getRoute('RouteFirstScreen').attachPatternMatched(this.GateEntry_NumberSuggestionChange, this);
            },
            onChangeAction: function () {
                var GateEntryAction = this.getView().byId("GateEntryAction").getSelectedButton().getText();
                if (GateEntryAction != "Create") {
                    var obj = {
                        "aGateNumberEditableorNot": true,
                    }
                    this.getView().setModel(new sap.ui.model.json.JSONModel(obj), "oGateNumberEditableModel");
                } else {
                    this.getView().byId("GateEntry_Number").setValue()
                    var obj = {
                        "aGateNumberEditableorNot": false,
                    }
                    this.getView().setModel(new sap.ui.model.json.JSONModel(obj), "oGateNumberEditableModel");
                }


            },
            Gate_Entry_TypeFunction: function () {
                var EntryType = this.getView().byId("Gate_Entry_Type").getValue();
                this.getView().byId("GateEntry_Number").setValue()
                if (EntryType == "Returnable" || EntryType == "Sample" || EntryType == "Loan") {
                    var obj = {
                        "aGateInOutVisibleorNot": true,
                    }
                    this.getView().setModel(new sap.ui.model.json.JSONModel(obj), "oGateInOutVisibleModel");
                } else {
                    var obj = {
                        "aGateInOutVisibleorNot": false,
                    }
                    this.getView().setModel(new sap.ui.model.json.JSONModel(obj), "oGateInOutVisibleModel");
                }
                this.GateEntry_NumberSuggestionChange();
            },
            GotoNextScree1n11: function () {
                var GateEntryAction = this.getView().byId("GateEntryAction").getSelectedButton().getText();
                if (GateEntryAction == "") {
                    this.printPdf();
                } else {
                    this.GotoNextScreen();
                }
            },
            GotoNextScreen: function () {
                var GateEntryAction = this.getView().byId("GateEntryAction").getSelectedButton().getText();
                var EntryType = this.getView().byId("Gate_Entry_Type").getValue();
                var Plant = this.getView().byId("Plant").getValue();
                var CompanyCode = this.getView().byId("CompanyCode").getValue();
                var EntryNumber = this.getView().byId("GateEntry_Number").getValue();
                if ((GateEntryAction != "Create" && EntryNumber == "") || Plant === "" || CompanyCode === "" || EntryType === "" ) {
                    var aError = [];
                    if (GateEntryAction != "Create" && EntryNumber == "") { aError.push(new Text({ text: "Gate Entry Number Is Mandatory Field" })) }
                    if (Plant === "") { aError.push(new Text({ text: "Plant Is Mandatory Field" })) }
                    if (CompanyCode === "") { aError.push(new Text({ text: "Company Code Is Mandatory Field" })) }
                    if (EntryType === "") { aError.push(new Text({ text: "Gate Entry Type Is Mandatory Field" })) }
                    var vbox = new sap.m.VBox({
                        items: aError
                    });
                    MessageBox.error(vbox, {
                        title: "Error!!!",
                    });
                } else if (GateEntryAction == "Print") {
                    this.pdfPrint();
                } else if (GateEntryAction == "Weighing Slip Print") {
                    this.pdfPrint1();
                } else {
                    var GateType = "";
                    if (EntryType == "Sales") {
                        GateType = "DEL";
                    } else if (EntryType == "Sales Return") {
                        GateType = "RDEL";
                    } else if (EntryType == "Returnable") {
                        GateType = "RGP";
                    } else if (EntryType == "Sample") {
                        GateType = "SAMPL";
                    } else if (EntryType == "Loan") {
                        GateType = "LOAN";
                    } else if (EntryType == "Non Returnable") {
                        GateType = "NRGP";
                    } else if (EntryType == "Purchase") {
                        GateType = "WPO";
                    } else if (EntryType == "Purchase Return") {
                        GateType = "WPOR";
                    }
                    var object = {
                        "Plant": Plant,
                        "GateType": GateType,
                        "GateNumber": EntryNumber,
                        "CompanyCode": CompanyCode,
                        "GateEntryAction": GateEntryAction,
                        "GateInOut": this.getView().byId("GateInOut").getValue(),
                        "CreatedOn": this.getView().byId("CreatedOn").getValue(),
                    }
                    this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(object), "oFirstScrennDataModel");
                    if (EntryType == "Sales") {
                        UIComponent.getRouterFor(this).navTo("SalesGateType");
                    } else if (EntryType == "Sales Return") {
                        UIComponent.getRouterFor(this).navTo("SalesReturnGateType");
                    } else if (EntryType == "Purchase") {
                        UIComponent.getRouterFor(this).navTo("Purchase");
                    } else if (EntryType == "Purchase Return") {
                        UIComponent.getRouterFor(this).navTo("PurchaseReturn");
                    } else if (EntryType == "Returnable") {
                        UIComponent.getRouterFor(this).navTo("Returnable");
                    } else if (EntryType == "Loan") {
                        UIComponent.getRouterFor(this).navTo("LoanGateType");
                    } else if (EntryType == "Sample") {
                        UIComponent.getRouterFor(this).navTo("SampleGateType");
                    } else if (EntryType == "Non Returnable") {
                        UIComponent.getRouterFor(this).navTo("NonReturnable");
                    }
                }
            },
            //ChangeGateEntryType using Formattor
            ChangeGateEntryType: function (sValue) {
                var GateType = "";
                if (sValue == "DEL") {
                    GateType = "Sales";
                } else if (sValue == "RDEL") {
                    GateType = "Sales Return";
                } else if (sValue == "RGP") {
                    GateType = "Returnable";
                } else if (sValue == "SAMPL") {
                    GateType = "Sample";
                } else if (sValue == "LOAN") {
                    GateType = "Loan";
                } else if (sValue == "NRGP") {
                    GateType = "Non Returnable";
                } else if (sValue == "WPO") {
                    GateType = "Purchase";
                } else if (sValue == "WPOR") {
                    GateType = "Purchase Return";
                }
                return GateType;
            },
            GateEntry_NumberSuggestionChange: function () {
                var EntryType = this.getView().byId("Gate_Entry_Type").getValue();
                var oInput = this.getView().byId("GateEntry_Number");
                var aFilters = [];
                if (EntryType == "Sales") {
                    aFilters.push(new sap.ui.model.Filter("EntryType", "EQ", "DEL"));
                } else if (EntryType == "Sales Return") {
                    aFilters.push(new sap.ui.model.Filter("EntryType", "EQ", "RDEL"));
                } else if (EntryType == "Returnable") {
                    aFilters.push(new sap.ui.model.Filter("EntryType", "EQ", "RGP"));
                } else if (EntryType == "Loan") {
                    aFilters.push(new sap.ui.model.Filter("EntryType", "EQ", "LOAN"));
                } else if (EntryType == "Sample") {
                    aFilters.push(new sap.ui.model.Filter("EntryType", "EQ", "SAMPL"));
                } else if (EntryType == "Non Returnable") {
                    aFilters.push(new sap.ui.model.Filter("EntryType", "EQ", "NRGP"));
                } else if (EntryType == "Purchase") {
                    aFilters.push(new sap.ui.model.Filter("EntryType", "EQ", "WPO"));
                } else if (EntryType == "Purchase Return") {
                    aFilters.push(new sap.ui.model.Filter("EntryType", "EQ", "WPOR"));
                }
                oInput.getBinding("suggestionRows").filter(aFilters);

            },
            PlantChangeAccordingtoCompanyCode: function (oEvent) {
                var CompanyCode = oEvent.mParameters.value;
                if (CompanyCode == "1000") {
                    var aPlantArr = [
                        { "Plant": "1000", "PlantName": "Common Sudiva Plant", },
                        { "Plant": "1101", "PlantName": "Open End Plant (Spinning)", },
                        { "Plant": "1111", "PlantName": "Ring Frame Plant 1 (Spinning)", },
                        { "Plant": "1112", "PlantName": "Ring Frame Plant 2 (Spinning)", },
                        { "Plant": "1113", "PlantName": "Ring Frame Plant 3 (Spinning)", },
                        { "Plant": "1301", "PlantName": "Knitting Plant", },
                    ]
                    this.getView().getModel("oPlantDataModel").setProperty("/aPlantData", aPlantArr);
                } else if (CompanyCode == "2000") {
                    var aPlantArr = [
                        { "Plant": "1901", "PlantName": "Solar Power Plant", },
                        { "Plant": "2901", "PlantName": "Solar Power Plant", },
                    ]
                    this.getView().getModel("oPlantDataModel").setProperty("/aPlantData", aPlantArr);
                } else if (CompanyCode == "") {
                    var aPlantArr = [
                        { "Plant": "1000", "PlantName": "Common Sudiva Plant", },
                        { "Plant": "1101", "PlantName": "Open End Plant (Spinning)", },
                        { "Plant": "1111", "PlantName": "Ring Frame Plant 1 (Spinning)", },
                        { "Plant": "1112", "PlantName": "Ring Frame Plant 2 (Spinning)", },
                        { "Plant": "1113", "PlantName": "Ring Frame Plant 3 (Spinning)", },
                        { "Plant": "1301", "PlantName": "Knitting Plant", },
                        { "Plant": "1901", "PlantName": "Solar Power Plant", },
                        { "Plant": "2901", "PlantName": "Solar Power Plant", },
                    ]
                    this.getView().getModel("oPlantDataModel").setProperty("/aPlantData", aPlantArr);
                }
            },
            pdfPrint: function () {
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Loading",
                    text: "Please wait"
                });
                oBusyDialog.open();
                var gatenum = this.getView().byId("GateEntry_Number").getValue();

                // https://my410662.s4hana.cloud.sap:443/sap/bc/http/sap/ZGATEHTTP_2022?sap-client=080
                // var url = "/sap/bc/http/sap/zgatehttp_2022?sap-client=080&f=";
                var url = "/sap/bc/http/sap/ZGATEHTTP_2022?sap-client=080&f=";
                var url2 = url + gatenum;
                var username = "ZSAP_4MUSER";
                var password = "LECapyZCfBppljSuk}TVWLSAUpS7RgmNLLaoFrAS";
                $.ajax({
                    url: url2,
                    type: "GET",
                    beforeSend: function (xhr) {
                        xhr.withCredentials = true;
                        xhr.username = username;
                        xhr.password = password;
                    },
                    success: function (result) {
                        console.log(result);
                        var decodedPdfContent = atob(result);
                        var byteArray = new Uint8Array(decodedPdfContent.length);
                        for (var i = 0; i < decodedPdfContent.length; i++) {
                            byteArray[i] = decodedPdfContent.charCodeAt(i);
                        }
                        var blob = new Blob([byteArray.buffer], {
                            type: 'application/pdf'
                        });
                        var _pdfurl = URL.createObjectURL(blob);

                        if (!this._PDFViewer) {
                            this._PDFViewer = new sap.m.PDFViewer({
                                width: "auto",
                                source: _pdfurl
                            });
                            jQuery.sap.addUrlWhitelist("blob"); // register blob url as whitelist
                        } else {
                            this._PDFViewer = new sap.m.PDFViewer({
                                width: "auto",
                                source: _pdfurl
                            });
                            jQuery.sap.addUrlWhitelist("blob"); // register blob url as whitelist
                        }
                        oBusyDialog.close();
                        this._PDFViewer.open();
                    }.bind(this)
                });
            },
            pdfPrint1: function () {
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Loading",
                    text: "Please wait"
                });
                oBusyDialog.open();
                var gatenum = this.getView().byId("GateEntry_Number").getValue();
                // var url = "/sap/bc/http/sap/zgatehttp_2022?sap-client=080&f=";
                var url = "/sap/bc/http/sap/ZGATEHTTP_2022?sap-client=080&f=";

                var url2 = url + gatenum;
                var url3 = "&printtype=weighingslip";
                var url4 = url2 + url3;
                var username = "ZSAP_4MUSER";
                var password = "LECapyZCfBppljSuk}TVWLSAUpS7RgmNLLaoFrAS";
                $.ajax({
                    url: url4,
                    type: "GET",
                    beforeSend: function (xhr) {
                        xhr.withCredentials = true;
                        xhr.username = username;
                        xhr.password = password;
                    },
                    success: function (result) {
                        console.log(result);
                        var decodedPdfContent = atob(result);
                        var byteArray = new Uint8Array(decodedPdfContent.length);
                        for (var i = 0; i < decodedPdfContent.length; i++) {
                            byteArray[i] = decodedPdfContent.charCodeAt(i);
                        }
                        var blob = new Blob([byteArray.buffer], {
                            type: 'application/pdf'
                        });
                        var _pdfurl = URL.createObjectURL(blob);

                        if (!this._PDFViewer) {
                            this._PDFViewer = new sap.m.PDFViewer({
                                width: "auto",
                                source: _pdfurl
                            });
                            jQuery.sap.addUrlWhitelist("blob"); // register blob url as whitelist
                        } else {
                            this._PDFViewer = new sap.m.PDFViewer({
                                width: "auto",
                                source: _pdfurl
                            });
                            jQuery.sap.addUrlWhitelist("blob"); // register blob url as whitelist
                        }
                        oBusyDialog.close();
                        this._PDFViewer.open();
                    }.bind(this)
                });
            },























































            
        });
    });
