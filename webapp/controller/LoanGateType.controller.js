sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    'sap/m/MessageToast',
    "sap/ui/core/Fragment",
    "sap/m/MessageBox",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Filter",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, UIComponent, MessageToast, Fragment, MessageBox, FilterOperator, Filter) {
        "use strict";

        return Controller.extend("zgateentry.controller.LoanGateType", {
            onInit: function () {
                this.getView().setModel(new sap.ui.model.json.JSONModel, "oTableDataModel");
                UIComponent.getRouterFor(this).getRoute('LoanGateType').attachPatternMatched(this.ScreenRefrash, this);
                UIComponent.getRouterFor(this).getRoute('LoanGateType').attachPatternMatched(this.CallGateEntryData, this);
            },
            ScreenRefrash: function () {
                var oTableModel = this.getView().getModel("oTableDataModel");
                oTableModel.setProperty("/aTableData", []);
                this.getView().byId("GateEntryNumber").setValue()
                this.getView().byId("GateEntryType").setValue()
                this.getView().byId("Plant").setValue()
                this.getView().byId("ReportingDate").setValue()
                this.getView().byId("VehicleNo").setValue()
                this.getView().byId("ChallanQty").setValue()
                this.getView().byId("OperatorName").setValue()
                this.getView().byId("GateInDate").setValue()
                this.getView().byId("GateInTime").setValue()
                this.getView().byId("LRDate").setValue()
                this.getView().byId("LRNumber").setValue()
                this.getView().byId("Remark").setValue()
                this.getView().byId("ModeofTransport").setValue()
                this.getView().byId("TransporterName").setValue()
                this.getView().byId("PurchaseGroup").setValue()
                this.getView().byId("DriverName").setValue()
                this.getView().byId("DriverMobileNo").setValue()
                this.getView().byId("RefGateNo").setValue()
                this.getView().byId("DriverLicenseNo").setValue()
                this.getView().byId("DriverLicenseExpiryDate").setValue();
                this.getView().byId("DriverAlcoholic").setSelectedIndex(-1)
                this.getView().byId("FlammableSubstance").setSelectedIndex(-1)
                this.getView().byId("FireSafety").setSelectedIndex(-1)
                this.getView().byId("ReverseHorn").setSelectedIndex(-1)

                this.getView().byId("VehicleFitnessCertificate").setValue()
                this.getView().byId("VehicleRCDate").setValue()
                this.getView().byId("VehicleInsurance").setValue()
                this.getView().byId("VehiclePUCNo").setValue();
                this.getView().byId("GateOutDate").setValue()
                this.getView().byId("GateOutTime").setValue()

                this.getView().byId("InvoiceNo").setValue()
                this.getView().byId("InvoiceDate").setValue()
                this.getView().byId("PoNumber").setValue()
                this.getView().byId("TypeofReturn").setValue()
                this.getView().byId("GrossWeight").setValue()
                this.getView().byId("TareWeight").setValue()
                this.getView().byId("NetWaight").setValue()
            },

            CallGateEntryData: function () {
                var GateEntryAction = this.getView().getModel("oFirstScrennDataModel").getProperty("/GateEntryAction")
                if (GateEntryAction === "Create") { this.disableFieldsEditable(); this.callGateEntryDataforCreate() }
                else if (GateEntryAction === "Change") { this.disableFieldsEditable(); this.callGateEntryDataforChange() }
                else if (GateEntryAction === "Display") { this.disableFieldsEditable(); this.callGateEntryDataforDisplay() }
                else if (GateEntryAction === "Gate Out") { this.disableFieldsEditable(); this.callGateEntryDataforGateOut() }
            },
            disableFieldsEditable: function () {
                var GateEntryAction = this.getView().getModel("oFirstScrennDataModel").getProperty("/GateEntryAction")
                if (GateEntryAction === "Display") {
                    this.getView().byId("ReportingDate").setEditable(false);
                    this.getView().byId("VehicleNo").setEditable(false);
                    this.getView().byId("ChallanQty").setEditable(false);
                    this.getView().byId("OperatorName").setEditable(false);
                    this.getView().byId("GateInDate").setEditable(false);
                    this.getView().byId("GateInTime").setEditable(false);
                    this.getView().byId("LRDate").setEditable(false);
                    this.getView().byId("LRNumber").setEditable(false);
                    this.getView().byId("Remark").setEditable(false);
                    this.getView().byId("ModeofTransport").setEditable(false);
                    this.getView().byId("TransporterName").setEditable(false);
                    this.getView().byId("PurchaseGroup").setEditable(false);
                    this.getView().byId("DriverName").setEditable(false);
                    this.getView().byId("DriverMobileNo").setEditable(false);
                    this.getView().byId("RefGateNo").setEditable(false);
                    this.getView().byId("DriverLicenseNo").setEditable(false);
                    this.getView().byId("DriverLicenseExpiryDate").setEditable(false);;
                    this.getView().byId("DriverAlcoholic").setEditable(false);
                    this.getView().byId("FlammableSubstance").setEditable(false);
                    this.getView().byId("FireSafety").setEditable(false);
                    this.getView().byId("ReverseHorn").setEditable(false);

                    this.getView().byId("VehicleFitnessCertificate").setEditable(false);
                    this.getView().byId("VehicleRCDate").setEditable(false);
                    this.getView().byId("VehicleInsurance").setEditable(false);
                    this.getView().byId("VehiclePUCNo").setEditable(false);;
                    this.getView().byId("GateOutDate").setEditable(false);
                    this.getView().byId("GateOutTime").setEditable(false);

                    this.getView().byId("InvoiceNo").setEditable(false);
                    this.getView().byId("InvoiceDate").setEditable(false);
                    this.getView().byId("PoNumber").setEditable(false);
                    this.getView().byId("TypeofReturn").setEditable(false);
                    this.getView().byId("GrossWeight").setEditable(false);
                    this.getView().byId("TareWeight").setEditable(false);
                    this.getView().byId("NetWaight").setEditable(false);

                    this.getView().byId("Table_AddButton").setVisible(false);
                    this.getView().byId("Table_DeleteButton").setVisible(false);
                    this.getView().byId("Table_SaveButton").setVisible(false);
                } else {
                    this.getView().byId("ReportingDate").setEditable(true);
                    this.getView().byId("VehicleNo").setEditable(true);
                    this.getView().byId("ChallanQty").setEditable(true);
                    this.getView().byId("OperatorName").setEditable(true);
                    this.getView().byId("GateInDate").setEditable(true);
                    this.getView().byId("GateInTime").setEditable(true);
                    this.getView().byId("LRDate").setEditable(true);
                    this.getView().byId("LRNumber").setEditable(true);
                    this.getView().byId("Remark").setEditable(true);
                    this.getView().byId("ModeofTransport").setEditable(true);
                    this.getView().byId("TransporterName").setEditable(true);
                    this.getView().byId("PurchaseGroup").setEditable(true);
                    this.getView().byId("DriverName").setEditable(true);
                    this.getView().byId("DriverMobileNo").setEditable(true);
                    this.getView().byId("RefGateNo").setEditable(true);
                    this.getView().byId("DriverLicenseNo").setEditable(true);
                    this.getView().byId("DriverLicenseExpiryDate").setEditable(true);
                    this.getView().byId("DriverAlcoholic").setEditable(true);
                    this.getView().byId("FlammableSubstance").setEditable(true);
                    this.getView().byId("FireSafety").setEditable(true);
                    this.getView().byId("ReverseHorn").setEditable(true);

                    this.getView().byId("VehicleFitnessCertificate").setEditable(true);
                    this.getView().byId("VehicleRCDate").setEditable(true);
                    this.getView().byId("VehicleInsurance").setEditable(true);
                    this.getView().byId("VehiclePUCNo").setEditable(true);;
                    this.getView().byId("GateOutDate").setEditable(true);
                    this.getView().byId("GateOutTime").setEditable(true);

                    this.getView().byId("InvoiceNo").setEditable(true);
                    this.getView().byId("InvoiceDate").setEditable(true);
                    this.getView().byId("PoNumber").setEditable(true);
                    this.getView().byId("TypeofReturn").setEditable(true);
                    this.getView().byId("GrossWeight").setEditable(true);
                    this.getView().byId("TareWeight").setEditable(true);
                    this.getView().byId("NetWaight").setEditable(false);

                    this.getView().byId("Table_AddButton").setVisible(true);
                    this.getView().byId("Table_DeleteButton").setVisible(false);
                    this.getView().byId("Table_SaveButton").setVisible(true);
                }
            },
            callGateEntryDataforCreate: function () {
                var GateInOut = this.getView().getModel("oFirstScrennDataModel").getProperty("/GateInOut")
                var currentDate = new Date()
                var currentDate1 = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1).toString().padStart(2, "0") + "-" + (currentDate.getDate()).toString().padStart(2, "0");
                const currentTime = currentDate.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false });
                if (GateInOut == "Gate In") {
                    this.getView().byId("GateInDate").setEditable(true)
                    this.getView().byId("GateInTime").setEditable(true)
                    this.getView().byId("GateOutDate").setEditable(false)
                    this.getView().byId("GateOutTime").setEditable(false)
                    this.getView().byId("GateInDate").setValue(currentDate1)
                    this.getView().byId("GateInTime").setValue(currentTime)

                } else if (GateInOut == "Gate Out") {
                    this.getView().byId("GateInDate").setEditable(false)
                    this.getView().byId("GateInTime").setEditable(false)
                    this.getView().byId("GateOutDate").setEditable(true)
                    this.getView().byId("GateOutTime").setEditable(true)
                    this.getView().byId("GateOutDate").setValue(currentDate1)
                    this.getView().byId("GateOutTime").setValue(currentTime)
                }
                var Plant = this.getView().getModel("oFirstScrennDataModel").getProperty("/Plant")
                var GateType = this.getView().getModel("oFirstScrennDataModel").getProperty("/GateType")
                this.getView().byId("GateEntryType").setValue(GateType)
                this.getView().byId("Plant").setValue(Plant)
                this.getView().byId("ModeofTransport").setValue("Road")
                this.getView().byId("ReportingDate").setValue(currentDate1)
                this.getView().byId("LRDate").setValue(currentDate1)
                this.getView().byId("InvoiceDate").setValue(currentDate1)
            },
            callGateEntryDataforChange: function () {
                var oBusy = new sap.m.BusyDialog({
                    text: "Please Wait"
                });
                oBusy.open();
                var aTableArr = [];
                var GateInOut = this.getView().getModel("oFirstScrennDataModel").getProperty("/GateInOut")
                var oTableModel = this.getView().getModel("oTableDataModel");
                var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Y1416_GATE");
                var GateNumber = this.getView().getModel("oFirstScrennDataModel").getProperty("/GateNumber")
                var oFilter = new sap.ui.model.Filter("Gateno", "EQ", GateNumber);
                var currentDate = new Date()
                var currentDate1 = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1).toString().padStart(2, "0") + "-" + (currentDate.getDate()).toString().padStart(2, "0");
                const currentTime = currentDate.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false });
                oModel.read("/zgat", {
                    filters: [oFilter],
                    urlParameters: {
                        "$expand": "to_gateitem"
                    },
                    success: function (ores) {
                        if (ores.results.length > 0) {
                            this.getView().byId("GateEntryNumber").setValue(ores.results[0].Gateno)
                            this.getView().byId("GateEntryType").setValue(ores.results[0].EntryType)
                            this.getView().byId("Plant").setValue(ores.results[0].Plant)
                            if (ores.results[0].Entrydate == "" || ores.results[0].Entrydate == "0.00" || ores.results[0].Entrydate == null) {
                                this.getView().byId("ReportingDate").setValue()
                            } else {
                                const ReportingDate = new Date(ores.results[0].Entrydate);
                                const ReportingDate1 = `${ReportingDate.getFullYear()}-${ReportingDate.getMonth() + 1 < 10 ? '0' : ''}${ReportingDate.getMonth() + 1}-${ReportingDate.getDate() < 10 ? '0' : ''}${ReportingDate.getDate()}`;
                                this.getView().byId("ReportingDate").setValue(ReportingDate1)
                            }
                            this.getView().byId("VehicleNo").setValue(ores.results[0].VehicalNo)
                            this.getView().byId("ChallanQty").setValue(ores.results[0].Challan)
                            this.getView().byId("OperatorName").setValue(ores.results[0].Operator)
                            if (GateInOut == "Gate In") {
                                this.getView().byId("GateInDate").setEditable(true)
                                this.getView().byId("GateInTime").setEditable(true)
                                this.getView().byId("GateOutDate").setEditable(false)
                                this.getView().byId("GateOutTime").setEditable(false)
                                if (ores.results[0].GateInDt == "" || ores.results[0].GateInDt == "0.00" || ores.results[0].GateInDt == null) {
                                    this.getView().byId("GateInDate").setValue(currentDate1)
                                } else {
                                    const GateInDate = new Date(ores.results[0].GateInDt);
                                    const GateInDate1 = `${GateInDate.getFullYear()}-${GateInDate.getMonth() + 1 < 10 ? '0' : ''}${GateInDate.getMonth() + 1}-${GateInDate.getDate() < 10 ? '0' : ''}${GateInDate.getDate()}`;
                                    this.getView().byId("GateInDate").setValue(GateInDate1)
                                }
                                if (ores.results[0].GateInTm.ms == null || ores.results[0].GateInTm.ms == "0.00" || ores.results[0].GateInTm.ms == "") {
                                    var GateinTime = ores.results[0].GateInTm.ms;
                                    var GateinTime_seconds = Math.floor((GateinTime / 1000) % 60);
                                    var GateinTime_minutes = Math.floor(((GateinTime / (1000 * 60)) % 60));
                                    var GateinTime_hours = Math.floor(((GateinTime / (1000 * 60 * 60)) % 24));
                                    var GateinTime1 = GateinTime_hours + ":" + GateinTime_minutes + ":" + GateinTime_seconds
                                    var GateinTime2 = GateinTime1 == "0:0:0" ? '' : GateinTime1;
                                    this.getView().byId("GateInTime").setValue(GateinTime2)
                                } else {
                                    this.getView().byId("GateInTime").setValue(currentTime)
                                }
                                if (ores.results[0].GateOutTm.ms == null || ores.results[0].GateOutTm.ms == "0.00" || ores.results[0].GateOutTm.ms == "") {
                                    var GateOutTime = ores.results[0].GateOutTm.ms;
                                    var GateOutTime_seconds = Math.floor((GateOutTime / 1000) % 60);
                                    var GateOutTime_minutes = Math.floor(((GateOutTime / (1000 * 60)) % 60));
                                    var GateOutTime_hours = Math.floor(((GateOutTime / (1000 * 60 * 60)) % 24));
                                    var GateOutTime1 = GateOutTime_hours + ":" + GateOutTime_minutes + ":" + GateOutTime_seconds
                                    var GateOutTime2 = GateOutTime1 == "0:0:0" ? '' : GateOutTime1;
                                    this.getView().byId("GateOutTime").setValue(GateOutTime2)
                                } else {
                                    this.getView().byId("GateOutTime").setValue()
                                }
                                if (ores.results[0].GateOutDt == "" || ores.results[0].GateOutDt == "0.00" || ores.results[0].GateOutDt == null) {
                                    this.getView().byId("GateOutDate").setValue()
                                } else {
                                    const GateOutDate = new Date(ores.results[0].GateOutDt);
                                    const GateOutDate1 = `${GateOutDate.getFullYear()}-${GateOutDate.getMonth() + 1 < 10 ? '0' : ''}${GateOutDate.getMonth() + 1}-${GateOutDate.getDate() < 10 ? '0' : ''}${GateOutDate.getDate()}`;
                                    this.getView().byId("GateOutDate").setValue(GateOutDate1)
                                }
                                // this.getView().byId("GateInTime").setValue(currentTime)

                            } else if (GateInOut == "Gate Out") {
                                this.getView().byId("GateInDate").setEditable(false)
                                this.getView().byId("GateInTime").setEditable(false)
                                this.getView().byId("GateOutDate").setEditable(true)
                                this.getView().byId("GateOutTime").setEditable(true)
                                if (ores.results[0].GateInDt == "" || ores.results[0].GateInDt == "0.00" || ores.results[0].GateInDt == null) {
                                    this.getView().byId("GateInDate").setValue()
                                } else {
                                    const GateInDate = new Date(ores.results[0].GateInDt);
                                    const GateInDate1 = `${GateInDate.getFullYear()}-${GateInDate.getMonth() + 1 < 10 ? '0' : ''}${GateInDate.getMonth() + 1}-${GateInDate.getDate() < 10 ? '0' : ''}${GateInDate.getDate()}`;
                                    this.getView().byId("GateInDate").setValue(GateInDate1)
                                }
                                if (ores.results[0].GateInTm.ms == null || ores.results[0].GateInTm.ms == "0.00" || ores.results[0].GateInTm.ms == "") {
                                    var GateinTime = ores.results[0].GateInTm.ms;
                                    var GateinTime_seconds = Math.floor((GateinTime / 1000) % 60);
                                    var GateinTime_minutes = Math.floor(((GateinTime / (1000 * 60)) % 60));
                                    var GateinTime_hours = Math.floor(((GateinTime / (1000 * 60 * 60)) % 24));
                                    var GateinTime1 = GateinTime_hours + ":" + GateinTime_minutes + ":" + GateinTime_seconds
                                    var GateinTime2 = GateinTime1 == "0:0:0" ? '' : GateinTime1;
                                    this.getView().byId("GateInTime").setValue(GateinTime2)
                                } else {
                                    this.getView().byId("GateInTime").setValue()
                                }
                                if (ores.results[0].GateOutTm.ms == null || ores.results[0].GateOutTm.ms == "0.00" || ores.results[0].GateOutTm.ms == "") {
                                    var GateOutTime = ores.results[0].GateOutTm.ms;
                                    var GateOutTime_seconds = Math.floor((GateOutTime / 1000) % 60);
                                    var GateOutTime_minutes = Math.floor(((GateOutTime / (1000 * 60)) % 60));
                                    var GateOutTime_hours = Math.floor(((GateOutTime / (1000 * 60 * 60)) % 24));
                                    var GateOutTime1 = GateOutTime_hours + ":" + GateOutTime_minutes + ":" + GateOutTime_seconds
                                    var GateOutTime2 = GateOutTime1 == "0:0:0" ? '' : GateOutTime1;
                                    this.getView().byId("GateOutTime").setValue(GateOutTime2)
                                } else {
                                    this.getView().byId("GateOutTime").setValue(currentTime)
                                }
                                if (ores.results[0].GateOutDt == "" || ores.results[0].GateOutDt == "0.00" || ores.results[0].GateOutDt == null) {
                                    this.getView().byId("GateOutDate").setValue(currentDate1)
                                } else {
                                    const GateOutDate = new Date(ores.results[0].GateOutDt);
                                    const GateOutDate1 = `${GateOutDate.getFullYear()}-${GateOutDate.getMonth() + 1 < 10 ? '0' : ''}${GateOutDate.getMonth() + 1}-${GateOutDate.getDate() < 10 ? '0' : ''}${GateOutDate.getDate()}`;
                                    this.getView().byId("GateOutDate").setValue(GateOutDate1)
                                }
                            }
                            if (ores.results[0].LrDate == "" || ores.results[0].LrDate == "0.00" || ores.results[0].LrDate == null) {
                                this.getView().byId("LRDate").setValue()
                            } else {
                                const LRDate = new Date(ores.results[0].LrDate);
                                const LRDate1 = `${LRDate.getFullYear()}-${LRDate.getMonth() + 1 < 10 ? '0' : ''}${LRDate.getMonth() + 1}-${LRDate.getDate() < 10 ? '0' : ''}${LRDate.getDate()}`;
                                this.getView().byId("LRDate").setValue(LRDate1)
                            }
                            this.getView().byId("LRNumber").setValue(ores.results[0].LrNo)
                            this.getView().byId("Remark").setValue(ores.results[0].Remark)
                            this.getView().byId("ModeofTransport").setValue(ores.results[0].Name1)
                            this.getView().byId("TransporterName").setValue(ores.results[0].TrOper)
                            this.getView().byId("PurchaseGroup").setValue(ores.results[0].Puchgrp)
                            this.getView().byId("DriverName").setValue(ores.results[0].Driver)
                            this.getView().byId("DriverMobileNo").setValue(ores.results[0].Driverno)
                            this.getView().byId("DriverLicenseNo").setValue(ores.results[0].DrLisc)
                            if (ores.results[0].Driverlicense == "" || ores.results[0].Driverlicense == "0.00" || ores.results[0].Driverlicense == null) {
                                this.getView().byId("DriverLicenseExpiryDate").setValue()
                            } else {
                                const DriverLicenseExpiryDate = new Date(ores.results[0].Driverlicense);
                                const DriverLicenseExpiryDate1 = `${DriverLicenseExpiryDate.getFullYear()}-${DriverLicenseExpiryDate.getMonth() + 1 < 10 ? '0' : ''}${DriverLicenseExpiryDate.getMonth() + 1}-${DriverLicenseExpiryDate.getDate() < 10 ? '0' : ''}${DriverLicenseExpiryDate.getDate()}`;
                                this.getView().byId("DriverLicenseExpiryDate").setValue(DriverLicenseExpiryDate1)
                            }
                            if (ores.results[0].Driveralcoholic == "Yes") {
                                this.getView().byId("DriverAlcoholic").setSelectedIndex(0)
                            } else if (ores.results[0].Driveralcoholic == "No") {
                                this.getView().byId("DriverAlcoholic").setSelectedIndex(1)
                            } else {
                                this.getView().byId("DriverAlcoholic").setSelectedIndex(-1)
                            }
                            if (ores.results[0].Flammablesubstance == "Yes") {
                                this.getView().byId("FlammableSubstance").setSelectedIndex(0)
                            } else if (ores.results[0].Flammablesubstance == "No") {
                                this.getView().byId("FlammableSubstance").setSelectedIndex(1)
                            } else {
                                this.getView().byId("FlammableSubstance").setSelectedIndex(-1)
                            }
                            if (ores.results[0].Firesafety == "Yes") {
                                this.getView().byId("FireSafety").setSelectedIndex(0)
                            } else if (ores.results[0].Firesafety == "No") {
                                this.getView().byId("FireSafety").setSelectedIndex(1)
                            } else {
                                this.getView().byId("FireSafety").setSelectedIndex(-1)
                            }
                            if (ores.results[0].Reversehorn == "Yes") {
                                this.getView().byId("ReverseHorn").setSelectedIndex(0)
                            } else if (ores.results[0].Reversehorn == "No") {
                                this.getView().byId("ReverseHorn").setSelectedIndex(1)
                            } else {
                                this.getView().byId("ReverseHorn").setSelectedIndex(-1)
                            }
                            if (ores.results[0].Vehiclefitness == "" || ores.results[0].Vehiclefitness == "0.00" || ores.results[0].Vehiclefitness == null) {
                                this.getView().byId("VehicleFitnessCertificate").setValue()
                            } else {
                                const VehicleFitnessCertificate = new Date(ores.results[0].Vehiclefitness);
                                const VehicleFitnessCertificate1 = `${VehicleFitnessCertificate.getFullYear()}-${VehicleFitnessCertificate.getMonth() + 1 < 10 ? '0' : ''}${VehicleFitnessCertificate.getMonth() + 1}-${VehicleFitnessCertificate.getDate() < 10 ? '0' : ''}${VehicleFitnessCertificate.getDate()}`;
                                this.getView().byId("VehicleFitnessCertificate").setValue(VehicleFitnessCertificate1)
                            }
                            if (ores.results[0].Vehiclercdate == "" || ores.results[0].Vehiclercdate == "0.00" || ores.results[0].Vehiclercdate == null) {
                                this.getView().byId("VehicleRCDate").setValue()
                            } else {
                                const VehicleRCDate = new Date(ores.results[0].Vehiclercdate);
                                const VehicleRCDate1 = `${VehicleRCDate.getFullYear()}-${VehicleRCDate.getMonth() + 1 < 10 ? '0' : ''}${VehicleRCDate.getMonth() + 1}-${VehicleRCDate.getDate() < 10 ? '0' : ''}${VehicleRCDate.getDate()}`;
                                this.getView().byId("VehicleRCDate").setValue(VehicleRCDate1)
                            }

                            if (ores.results[0].Vehicleinsurance == "" || ores.results[0].Vehicleinsurance == "0.00" || ores.results[0].Vehicleinsurance == null) {
                                this.getView().byId("VehicleInsurance").setValue()
                            } else {
                                const VehicleInsurance = new Date(ores.results[0].Vehicleinsurance);
                                const VehicleInsurance1 = `${VehicleInsurance.getFullYear()}-${VehicleInsurance.getMonth() + 1 < 10 ? '0' : ''}${VehicleInsurance.getMonth() + 1}-${VehicleInsurance.getDate() < 10 ? '0' : ''}${VehicleInsurance.getDate()}`;
                                this.getView().byId("VehicleInsurance").setValue(VehicleInsurance1)
                            }
                            this.getView().byId("VehiclePUCNo").setValue(ores.results[0].Vehiclepuc);

                            this.getView().byId("InvoiceNo").setValue(ores.results[0].Invoice)
                            if (ores.results[0].Invdt == "" || ores.results[0].Invdt == "0.00" || ores.results[0].Invdt == null) {
                                this.getView().byId("InvoiceDate").setValue()
                            } else {
                                const InvoiceDate = new Date(ores.results[0].Invdt);
                                const InvoiceDate1 = `${InvoiceDate.getFullYear()}-${InvoiceDate.getMonth() + 1 < 10 ? '0' : ''}${InvoiceDate.getMonth() + 1}-${InvoiceDate.getDate() < 10 ? '0' : ''}${InvoiceDate.getDate()}`;
                                this.getView().byId("InvoiceDate").setValue(InvoiceDate1)
                            }
                            this.getView().byId("GrossWeight").setValue(ores.results[0].GrossWt)
                            this.getView().byId("TareWeight").setValue(ores.results[0].TareWt)
                            this.getView().byId("NetWaight").setValue(ores.results[0].NetWt)
                            this.getView().byId("TypeofReturn").setValue(ores.results[0].Typeofreturn)

                            for (var D = 0; D < ores.results[0].to_gateitem.results.length; D++) {
                                aTableArr.push({
                                    "BackendDataAvl": true,
                                    "tableFieldEditable": true,
                                    "otherFieldEditable": false,
                                    "PoNumber": ores.results[0].to_gateitem.results[D].Ebeln,
                                    "Item": ores.results[0].to_gateitem.results[D].GateItem,
                                    "VendorCode": ores.results[0].to_gateitem.results[D].Lifnr,
                                    "VendorName": ores.results[0].to_gateitem.results[D].Name1,
                                    "VendorAddress": ores.results[0].to_gateitem.results[D].Address1,
                                    "MaterialCode": ores.results[0].to_gateitem.results[D].Maktx,
                                    "MaterialDescription": ores.results[0].to_gateitem.results[D].Matnr,
                                    "HSNCode": ores.results[0].to_gateitem.results[D].Lpnum,
                                    "GateOutQuantity": ores.results[0].to_gateitem.results[D].OutQty,
                                    "GateQuantity": ores.results[0].to_gateitem.results[D].GateQty,
                                    "BalancedQuantity": ores.results[0].to_gateitem.results[D].OpenQty,
                                    "Unit": ores.results[0].to_gateitem.results[D].Uom,
                                    "Remark": ores.results[0].to_gateitem.results[D].Remark,
                                    "Bill_ChallanNo": ores.results[0].to_gateitem.results[D].Zinvoice,
                                    "Amount": ores.results[0].to_gateitem.results[D].OutValue,
                                })
                            }
                            aTableArr.sort(function (a, b) {
                                return a.Item - b.Item;
                            });
                            oTableModel.setProperty("/aTableData", aTableArr);
                            oBusy.close();
                        }
                    }.bind(this)
                })
            },
            callGateEntryDataforDisplay: function () {
                var oBusy = new sap.m.BusyDialog({
                    text: "Please Wait"
                });
                oBusy.open();
                var aTableArr = [];
                var GateInOut = this.getView().getModel("oFirstScrennDataModel").getProperty("/GateInOut")
                var oTableModel = this.getView().getModel("oTableDataModel");
                var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Y1416_GATE");
                var GateNumber = this.getView().getModel("oFirstScrennDataModel").getProperty("/GateNumber")
                var oFilter = new sap.ui.model.Filter("Gateno", "EQ", GateNumber);
                oModel.read("/zgat", {
                    filters: [oFilter],
                    urlParameters: {
                        "$expand": "to_gateitem"
                    },
                    success: function (ores) {
                        if (ores.results.length > 0) {
                            this.getView().byId("GateEntryNumber").setValue(ores.results[0].Gateno)
                            this.getView().byId("GateEntryType").setValue(ores.results[0].EntryType)
                            this.getView().byId("Plant").setValue(ores.results[0].Plant)
                            if (ores.results[0].Entrydate == "" || ores.results[0].Entrydate == "0.00") {
                                this.getView().byId("ReportingDate").setValue()
                            } else {
                                const ReportingDate = new Date(ores.results[0].Entrydate);
                                const ReportingDate1 = `${ReportingDate.getFullYear()}-${ReportingDate.getMonth() + 1 < 10 ? '0' : ''}${ReportingDate.getMonth() + 1}-${ReportingDate.getDate() < 10 ? '0' : ''}${ReportingDate.getDate()}`;
                                this.getView().byId("ReportingDate").setValue(ReportingDate1)
                            }
                            this.getView().byId("VehicleNo").setValue(ores.results[0].VehicalNo)
                            this.getView().byId("ChallanQty").setValue(ores.results[0].Challan)
                            this.getView().byId("OperatorName").setValue(ores.results[0].Operator)

                            if (ores.results[0].GateInDt == "" || ores.results[0].GateInDt == "0.00" || ores.results[0].GateInDt == null) {
                                this.getView().byId("GateInDate").setValue()
                            } else {
                                const GateInDate = new Date(ores.results[0].GateInDt);
                                const GateInDate1 = `${GateInDate.getFullYear()}-${GateInDate.getMonth() + 1 < 10 ? '0' : ''}${GateInDate.getMonth() + 1}-${GateInDate.getDate() < 10 ? '0' : ''}${GateInDate.getDate()}`;
                                this.getView().byId("GateInDate").setValue(GateInDate1)
                            }
                            if (ores.results[0].GateInTm.ms == null || ores.results[0].GateInTm.ms == 0 || ores.results[0].GateInTm.ms == "0.00" || ores.results[0].GateInTm.ms == "") {
                                var GateinTime = ores.results[0].GateInTm.ms;
                                var GateinTime_seconds = Math.floor((GateinTime / 1000) % 60);
                                var GateinTime_minutes = Math.floor(((GateinTime / (1000 * 60)) % 60));
                                var GateinTime_hours = Math.floor(((GateinTime / (1000 * 60 * 60)) % 24));
                                var GateinTime1 = GateinTime_hours + ":" + GateinTime_minutes + ":" + GateinTime_seconds
                                this.getView().byId("GateInTime").setValue(GateinTime1)
                            } else {
                                this.getView().byId("GateInTime").setValue()
                            }
                            if (ores.results[0].GateOutTm.ms == null || ores.results[0].GateOutTm.ms == 0 || ores.results[0].GateOutTm.ms == "0.00" || ores.results[0].GateOutTm.ms == "") {
                                var GateOutTime = ores.results[0].GateOutTm.ms;
                                var GateOutTime_seconds = Math.floor((GateOutTime / 1000) % 60);
                                var GateOutTime_minutes = Math.floor(((GateOutTime / (1000 * 60)) % 60));
                                var GateOutTime_hours = Math.floor(((GateOutTime / (1000 * 60 * 60)) % 24));
                                var GateOutTime1 = GateOutTime_hours + ":" + GateOutTime_minutes + ":" + GateOutTime_seconds
                                this.getView().byId("GateOutTime").setValue(GateOutTime1)
                            } else {
                                this.getView().byId("GateOutTime").setValue()
                            }
                            if (ores.results[0].GateOutDt == "" || ores.results[0].GateOutDt == "0.00" || ores.results[0].GateOutDt == null) {
                                this.getView().byId("GateOutDate").setValue()
                            } else {
                                const GateOutDate = new Date(ores.results[0].GateOutDt);
                                const GateOutDate1 = `${GateOutDate.getFullYear()}-${GateOutDate.getMonth() + 1 < 10 ? '0' : ''}${GateOutDate.getMonth() + 1}-${GateOutDate.getDate() < 10 ? '0' : ''}${GateOutDate.getDate()}`;
                                this.getView().byId("GateOutDate").setValue(GateOutDate1)
                            }
                            if (ores.results[0].LrDate == "" || ores.results[0].LrDate == "0.00") {
                                this.getView().byId("LRDate").setValue()
                            } else {
                                const LRDate = new Date(ores.results[0].LrDate);
                                const LRDate1 = `${LRDate.getFullYear()}-${LRDate.getMonth() + 1 < 10 ? '0' : ''}${LRDate.getMonth() + 1}-${LRDate.getDate() < 10 ? '0' : ''}${LRDate.getDate()}`;
                                this.getView().byId("LRDate").setValue(LRDate1)
                            }
                            this.getView().byId("LRNumber").setValue(ores.results[0].LrNo)
                            this.getView().byId("Remark").setValue(ores.results[0].Remark)
                            this.getView().byId("ModeofTransport").setValue(ores.results[0].Name1)
                            this.getView().byId("TransporterName").setValue(ores.results[0].TrOper)
                            this.getView().byId("PurchaseGroup").setValue(ores.results[0].Puchgrp)
                            this.getView().byId("DriverName").setValue(ores.results[0].Driver)
                            this.getView().byId("DriverMobileNo").setValue(ores.results[0].Driverno)
                            this.getView().byId("DriverLicenseNo").setValue(ores.results[0].DrLisc)
                            if (ores.results[0].Driverlicense == "" || ores.results[0].Driverlicense == "0.00") {
                                this.getView().byId("DriverLicenseExpiryDate").setValue()
                            } else {
                                const DriverLicenseExpiryDate = new Date(ores.results[0].Driverlicense);
                                const DriverLicenseExpiryDate1 = `${DriverLicenseExpiryDate.getFullYear()}-${DriverLicenseExpiryDate.getMonth() + 1 < 10 ? '0' : ''}${DriverLicenseExpiryDate.getMonth() + 1}-${DriverLicenseExpiryDate.getDate() < 10 ? '0' : ''}${DriverLicenseExpiryDate.getDate()}`;
                                this.getView().byId("DriverLicenseExpiryDate").setValue(DriverLicenseExpiryDate1)
                            }
                            if (ores.results[0].Driveralcoholic == "Yes") {
                                this.getView().byId("DriverAlcoholic").setSelectedIndex(0)
                            } else if (ores.results[0].Driveralcoholic == "No") {
                                this.getView().byId("DriverAlcoholic").setSelectedIndex(1)
                            } else {
                                this.getView().byId("DriverAlcoholic").setSelectedIndex(-1)
                            }
                            if (ores.results[0].Flammablesubstance == "Yes") {
                                this.getView().byId("FlammableSubstance").setSelectedIndex(0)
                            } else if (ores.results[0].Flammablesubstance == "No") {
                                this.getView().byId("FlammableSubstance").setSelectedIndex(1)
                            } else {
                                this.getView().byId("FlammableSubstance").setSelectedIndex(-1)
                            }
                            if (ores.results[0].Firesafety == "Yes") {
                                this.getView().byId("FireSafety").setSelectedIndex(0)
                            } else if (ores.results[0].Firesafety == "No") {
                                this.getView().byId("FireSafety").setSelectedIndex(1)
                            } else {
                                this.getView().byId("FireSafety").setSelectedIndex(-1)
                            }
                            if (ores.results[0].Reversehorn == "Yes") {
                                this.getView().byId("ReverseHorn").setSelectedIndex(0)
                            } else if (ores.results[0].Reversehorn == "No") {
                                this.getView().byId("ReverseHorn").setSelectedIndex(1)
                            } else {
                                this.getView().byId("ReverseHorn").setSelectedIndex(-1)
                            }
                            if (ores.results[0].Vehiclefitness == "" || ores.results[0].Vehiclefitness == "0.00") {
                                this.getView().byId("VehicleFitnessCertificate").setValue()
                            } else {
                                const VehicleFitnessCertificate = new Date(ores.results[0].Vehiclefitness);
                                const VehicleFitnessCertificate1 = `${VehicleFitnessCertificate.getFullYear()}-${VehicleFitnessCertificate.getMonth() + 1 < 10 ? '0' : ''}${VehicleFitnessCertificate.getMonth() + 1}-${VehicleFitnessCertificate.getDate() < 10 ? '0' : ''}${VehicleFitnessCertificate.getDate()}`;
                                this.getView().byId("VehicleFitnessCertificate").setValue(VehicleFitnessCertificate1)
                            }
                            if (ores.results[0].Vehiclercdate == "" || ores.results[0].Vehiclercdate == "0.00") {
                                this.getView().byId("VehicleRCDate").setValue()
                            } else {
                                const VehicleRCDate = new Date(ores.results[0].Vehiclercdate);
                                const VehicleRCDate1 = `${VehicleRCDate.getFullYear()}-${VehicleRCDate.getMonth() + 1 < 10 ? '0' : ''}${VehicleRCDate.getMonth() + 1}-${VehicleRCDate.getDate() < 10 ? '0' : ''}${VehicleRCDate.getDate()}`;
                                this.getView().byId("VehicleRCDate").setValue(VehicleRCDate1)
                            }

                            if (ores.results[0].Vehicleinsurance == "" || ores.results[0].Vehicleinsurance == "0.00") {
                                this.getView().byId("VehicleInsurance").setValue()
                            } else {
                                const VehicleInsurance = new Date(ores.results[0].Vehicleinsurance);
                                const VehicleInsurance1 = `${VehicleInsurance.getFullYear()}-${VehicleInsurance.getMonth() + 1 < 10 ? '0' : ''}${VehicleInsurance.getMonth() + 1}-${VehicleInsurance.getDate() < 10 ? '0' : ''}${VehicleInsurance.getDate()}`;
                                this.getView().byId("VehicleInsurance").setValue(VehicleInsurance1)
                            }
                            this.getView().byId("VehiclePUCNo").setValue(ores.results[0].Vehiclepuc);

                            this.getView().byId("InvoiceNo").setValue(ores.results[0].Invoice)
                            if (ores.results[0].Invdt == "" || ores.results[0].Invdt == "0.00") {
                                this.getView().byId("InvoiceDate").setValue()
                            } else {
                                const InvoiceDate = new Date(ores.results[0].Invdt);
                                const InvoiceDate1 = `${InvoiceDate.getFullYear()}-${InvoiceDate.getMonth() + 1 < 10 ? '0' : ''}${InvoiceDate.getMonth() + 1}-${InvoiceDate.getDate() < 10 ? '0' : ''}${InvoiceDate.getDate()}`;
                                this.getView().byId("InvoiceDate").setValue(InvoiceDate1)
                            }
                            this.getView().byId("GrossWeight").setValue(ores.results[0].GrossWt)
                            this.getView().byId("TareWeight").setValue(ores.results[0].TareWt)
                            this.getView().byId("NetWaight").setValue(ores.results[0].NetWt)

                            for (var D = 0; D < ores.results[0].to_gateitem.results.length; D++) {
                                aTableArr.push({
                                    "BackendDataAvl": true,
                                    "tableFieldEditable": false,
                                    "otherFieldEditable": false,
                                    "PoNumber": ores.results[0].to_gateitem.results[D].Ebeln,
                                    "Item": ores.results[0].to_gateitem.results[D].GateItem,
                                    "VendorCode": ores.results[0].to_gateitem.results[D].Lifnr,
                                    "VendorName": ores.results[0].to_gateitem.results[D].Name1,
                                    "VendorAddress": ores.results[0].to_gateitem.results[D].Address1,
                                    "MaterialCode": ores.results[0].to_gateitem.results[D].Maktx,
                                    "MaterialDescription": ores.results[0].to_gateitem.results[D].Matnr,
                                    "HSNCode": ores.results[0].to_gateitem.results[D].Lpnum,
                                    "GateOutQuantity": ores.results[0].to_gateitem.results[D].OutQty,
                                    "GateQuantity": ores.results[0].to_gateitem.results[D].GateQty,
                                    "BalancedQuantity": ores.results[0].to_gateitem.results[D].OpenQty,
                                    "Unit": ores.results[0].to_gateitem.results[D].Uom,
                                    "Remark": ores.results[0].to_gateitem.results[D].Remark,
                                    "Bill_ChallanNo": ores.results[0].to_gateitem.results[D].Zinvoice,
                                    "Amount": ores.results[0].to_gateitem.results[D].OutValue,
                                })
                            }
                            aTableArr.sort(function (a, b) {
                                return a.Item - b.Item;
                            });
                            oTableModel.setProperty("/aTableData", aTableArr);
                            oBusy.close();
                        }
                    }.bind(this)
                })
            },
            callGateEntryDataforGateOut: function () {
                var oBusy = new sap.m.BusyDialog({
                    text: "Please Wait"
                });
                oBusy.open();
                var aTableArr = [];
                var GateInOut = this.getView().getModel("oFirstScrennDataModel").getProperty("/GateInOut")
                var oTableModel = this.getView().getModel("oTableDataModel");
                var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Y1416_GATE");
                var GateNumber = this.getView().getModel("oFirstScrennDataModel").getProperty("/GateNumber")
                var oFilter = new sap.ui.model.Filter("Gateno", "EQ", GateNumber);
                var currentDate = new Date()
                var currentDate1 = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1).toString().padStart(2, "0") + "-" + (currentDate.getDate()).toString().padStart(2, "0");
                const currentTime = currentDate.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false });
                oModel.read("/zgat", {
                    filters: [oFilter],
                    urlParameters: {
                        "$expand": "to_gateitem"
                    },
                    success: function (ores) {
                        if (ores.results.length > 0) {
                            this.getView().byId("GateEntryNumber").setValue(ores.results[0].Gateno)
                            this.getView().byId("GateEntryType").setValue(ores.results[0].EntryType)
                            this.getView().byId("Plant").setValue(ores.results[0].Plant)
                            if (ores.results[0].Entrydate == "" || ores.results[0].Entrydate == "0.00" || ores.results[0].Entrydate == null) {
                                this.getView().byId("ReportingDate").setValue()
                            } else {
                                const ReportingDate = new Date(ores.results[0].Entrydate);
                                const ReportingDate1 = `${ReportingDate.getFullYear()}-${ReportingDate.getMonth() + 1 < 10 ? '0' : ''}${ReportingDate.getMonth() + 1}-${ReportingDate.getDate() < 10 ? '0' : ''}${ReportingDate.getDate()}`;
                                this.getView().byId("ReportingDate").setValue(ReportingDate1)
                            }
                            this.getView().byId("VehicleNo").setValue(ores.results[0].VehicalNo)
                            this.getView().byId("ChallanQty").setValue(ores.results[0].Challan)
                            this.getView().byId("OperatorName").setValue(ores.results[0].Operator)
                            if (GateInOut == "Gate In") {
                                this.getView().byId("GateInDate").setEditable(true)
                                this.getView().byId("GateInTime").setEditable(true)
                                this.getView().byId("GateOutDate").setEditable(false)
                                this.getView().byId("GateOutTime").setEditable(false)
                                if (ores.results[0].GateInDt == "" || ores.results[0].GateInDt == "0.00" || ores.results[0].GateInDt == null) {
                                    this.getView().byId("GateInDate").setValue(currentDate1)
                                } else {
                                    const GateInDate = new Date(ores.results[0].GateInDt);
                                    const GateInDate1 = `${GateInDate.getFullYear()}-${GateInDate.getMonth() + 1 < 10 ? '0' : ''}${GateInDate.getMonth() + 1}-${GateInDate.getDate() < 10 ? '0' : ''}${GateInDate.getDate()}`;
                                    this.getView().byId("GateInDate").setValue(GateInDate1)
                                }
                                if (ores.results[0].GateInTm.ms == null || ores.results[0].GateInTm.ms == 0 || ores.results[0].GateInTm.ms == "0.00" || ores.results[0].GateInTm.ms == "") {
                                    var GateinTime = ores.results[0].GateInTm.ms;
                                    var GateinTime_seconds = Math.floor((GateinTime / 1000) % 60);
                                    var GateinTime_minutes = Math.floor(((GateinTime / (1000 * 60)) % 60));
                                    var GateinTime_hours = Math.floor(((GateinTime / (1000 * 60 * 60)) % 24));
                                    var GateinTime1 = GateinTime_hours + ":" + GateinTime_minutes + ":" + GateinTime_seconds
                                    this.getView().byId("GateInTime").setValue(GateinTime1)
                                } else {
                                    this.getView().byId("GateInTime").setValue(currentTime)
                                }
                                if (ores.results[0].GateOutTm.ms == null || ores.results[0].GateOutTm.ms == 0 || ores.results[0].GateOutTm.ms == "0.00" || ores.results[0].GateOutTm.ms == "") {
                                    var GateOutTime = ores.results[0].GateOutTm.ms;
                                    var GateOutTime_seconds = Math.floor((GateOutTime / 1000) % 60);
                                    var GateOutTime_minutes = Math.floor(((GateOutTime / (1000 * 60)) % 60));
                                    var GateOutTime_hours = Math.floor(((GateOutTime / (1000 * 60 * 60)) % 24));
                                    var GateOutTime1 = GateOutTime_hours + ":" + GateOutTime_minutes + ":" + GateOutTime_seconds
                                    this.getView().byId("GateOutTime").setValue(GateOutTime1)
                                } else {
                                    this.getView().byId("GateOutTime").setValue()
                                }
                                if (ores.results[0].GateOutDt == "" || ores.results[0].GateOutDt == "0.00" || ores.results[0].GateOutDt == null) {
                                    this.getView().byId("GateOutDate").setValue()
                                } else {
                                    const GateOutDate = new Date(ores.results[0].GateOutDt);
                                    const GateOutDate1 = `${GateOutDate.getFullYear()}-${GateOutDate.getMonth() + 1 < 10 ? '0' : ''}${GateOutDate.getMonth() + 1}-${GateOutDate.getDate() < 10 ? '0' : ''}${GateOutDate.getDate()}`;
                                    this.getView().byId("GateOutDate").setValue(GateOutDate1)
                                }
                                // this.getView().byId("GateInTime").setValue(currentTime)

                            } else if (GateInOut == "Gate Out") {
                                this.getView().byId("GateInDate").setEditable(false)
                                this.getView().byId("GateInTime").setEditable(false)
                                this.getView().byId("GateOutDate").setEditable(true)
                                this.getView().byId("GateOutTime").setEditable(true)
                                if (ores.results[0].GateInDt == "" || ores.results[0].GateInDt == "0.00" || ores.results[0].GateInDt == null) {
                                    this.getView().byId("GateInDate").setValue()
                                } else {
                                    const GateInDate = new Date(ores.results[0].GateInDt);
                                    const GateInDate1 = `${GateInDate.getFullYear()}-${GateInDate.getMonth() + 1 < 10 ? '0' : ''}${GateInDate.getMonth() + 1}-${GateInDate.getDate() < 10 ? '0' : ''}${GateInDate.getDate()}`;
                                    this.getView().byId("GateInDate").setValue(GateInDate1)
                                }
                                if (ores.results[0].GateInTm.ms == null || ores.results[0].GateInTm.ms == "0.00" || ores.results[0].GateInTm.ms == "") {
                                    var GateinTime = ores.results[0].GateInTm.ms;
                                    var GateinTime_seconds = Math.floor((GateinTime / 1000) % 60);
                                    var GateinTime_minutes = Math.floor(((GateinTime / (1000 * 60)) % 60));
                                    var GateinTime_hours = Math.floor(((GateinTime / (1000 * 60 * 60)) % 24));
                                    var GateinTime1 = GateinTime_hours + ":" + GateinTime_minutes + ":" + GateinTime_seconds
                                    this.getView().byId("GateInTime").setValue(GateinTime1)
                                } else {
                                    this.getView().byId("GateInTime").setValue()
                                }
                                if (ores.results[0].GateOutTm.ms == null || ores.results[0].GateOutTm.ms == "0.00" || ores.results[0].GateOutTm.ms == "") {
                                    var GateOutTime = ores.results[0].GateOutTm.ms;
                                    var GateOutTime_seconds = Math.floor((GateOutTime / 1000) % 60);
                                    var GateOutTime_minutes = Math.floor(((GateOutTime / (1000 * 60)) % 60));
                                    var GateOutTime_hours = Math.floor(((GateOutTime / (1000 * 60 * 60)) % 24));
                                    var GateOutTime1 = GateOutTime_hours + ":" + GateOutTime_minutes + ":" + GateOutTime_seconds
                                    this.getView().byId("GateOutTime").setValue(GateOutTime1)
                                } else {
                                    this.getView().byId("GateOutTime").setValue(currentTime)
                                }
                                if (ores.results[0].GateOutDt == "" || ores.results[0].GateOutDt == "0.00" || ores.results[0].GateOutDt == null) {
                                    this.getView().byId("GateOutDate").setValue(currentDate1)
                                } else {
                                    const GateOutDate = new Date(ores.results[0].GateOutDt);
                                    const GateOutDate1 = `${GateOutDate.getFullYear()}-${GateOutDate.getMonth() + 1 < 10 ? '0' : ''}${GateOutDate.getMonth() + 1}-${GateOutDate.getDate() < 10 ? '0' : ''}${GateOutDate.getDate()}`;
                                    this.getView().byId("GateOutDate").setValue(GateOutDate1)
                                }
                            }
                            if (ores.results[0].LrDate == "" || ores.results[0].LrDate == "0.00" || ores.results[0].LrDate == null) {
                                this.getView().byId("LRDate").setValue()
                            } else {
                                const LRDate = new Date(ores.results[0].LrDate);
                                const LRDate1 = `${LRDate.getFullYear()}-${LRDate.getMonth() + 1 < 10 ? '0' : ''}${LRDate.getMonth() + 1}-${LRDate.getDate() < 10 ? '0' : ''}${LRDate.getDate()}`;
                                this.getView().byId("LRDate").setValue(LRDate1)
                            }
                            this.getView().byId("LRNumber").setValue(ores.results[0].LrNo)
                            this.getView().byId("Remark").setValue(ores.results[0].Remark)
                            this.getView().byId("ModeofTransport").setValue(ores.results[0].Name1)
                            this.getView().byId("TransporterName").setValue(ores.results[0].TrOper)
                            this.getView().byId("PurchaseGroup").setValue(ores.results[0].Puchgrp)
                            this.getView().byId("DriverName").setValue(ores.results[0].Driver)
                            this.getView().byId("DriverMobileNo").setValue(ores.results[0].Driverno)
                            this.getView().byId("DriverLicenseNo").setValue(ores.results[0].DrLisc)
                            if (ores.results[0].Driverlicense == "" || ores.results[0].Driverlicense == "0.00" || ores.results[0].Driverlicense == null) {
                                this.getView().byId("DriverLicenseExpiryDate").setValue()
                            } else {
                                const DriverLicenseExpiryDate = new Date(ores.results[0].Driverlicense);
                                const DriverLicenseExpiryDate1 = `${DriverLicenseExpiryDate.getFullYear()}-${DriverLicenseExpiryDate.getMonth() + 1 < 10 ? '0' : ''}${DriverLicenseExpiryDate.getMonth() + 1}-${DriverLicenseExpiryDate.getDate() < 10 ? '0' : ''}${DriverLicenseExpiryDate.getDate()}`;
                                this.getView().byId("DriverLicenseExpiryDate").setValue(DriverLicenseExpiryDate1)
                            }
                            if (ores.results[0].Driveralcoholic == "Yes") {
                                this.getView().byId("DriverAlcoholic").setSelectedIndex(0)
                            } else if (ores.results[0].Driveralcoholic == "No") {
                                this.getView().byId("DriverAlcoholic").setSelectedIndex(1)
                            } else {
                                this.getView().byId("DriverAlcoholic").setSelectedIndex(-1)
                            }
                            if (ores.results[0].Flammablesubstance == "Yes") {
                                this.getView().byId("FlammableSubstance").setSelectedIndex(0)
                            } else if (ores.results[0].Flammablesubstance == "No") {
                                this.getView().byId("FlammableSubstance").setSelectedIndex(1)
                            } else {
                                this.getView().byId("FlammableSubstance").setSelectedIndex(-1)
                            }
                            if (ores.results[0].Firesafety == "Yes") {
                                this.getView().byId("FireSafety").setSelectedIndex(0)
                            } else if (ores.results[0].Firesafety == "No") {
                                this.getView().byId("FireSafety").setSelectedIndex(1)
                            } else {
                                this.getView().byId("FireSafety").setSelectedIndex(-1)
                            }
                            if (ores.results[0].Reversehorn == "Yes") {
                                this.getView().byId("ReverseHorn").setSelectedIndex(0)
                            } else if (ores.results[0].Reversehorn == "No") {
                                this.getView().byId("ReverseHorn").setSelectedIndex(1)
                            } else {
                                this.getView().byId("ReverseHorn").setSelectedIndex(-1)
                            }
                            if (ores.results[0].Vehiclefitness == "" || ores.results[0].Vehiclefitness == "0.00" || ores.results[0].Vehiclefitness == null) {
                                this.getView().byId("VehicleFitnessCertificate").setValue()
                            } else {
                                const VehicleFitnessCertificate = new Date(ores.results[0].Vehiclefitness);
                                const VehicleFitnessCertificate1 = `${VehicleFitnessCertificate.getFullYear()}-${VehicleFitnessCertificate.getMonth() + 1 < 10 ? '0' : ''}${VehicleFitnessCertificate.getMonth() + 1}-${VehicleFitnessCertificate.getDate() < 10 ? '0' : ''}${VehicleFitnessCertificate.getDate()}`;
                                this.getView().byId("VehicleFitnessCertificate").setValue(VehicleFitnessCertificate1)
                            }
                            if (ores.results[0].Vehiclercdate == "" || ores.results[0].Vehiclercdate == "0.00" || ores.results[0].Vehiclercdate == null) {
                                this.getView().byId("VehicleRCDate").setValue()
                            } else {
                                const VehicleRCDate = new Date(ores.results[0].Vehiclercdate);
                                const VehicleRCDate1 = `${VehicleRCDate.getFullYear()}-${VehicleRCDate.getMonth() + 1 < 10 ? '0' : ''}${VehicleRCDate.getMonth() + 1}-${VehicleRCDate.getDate() < 10 ? '0' : ''}${VehicleRCDate.getDate()}`;
                                this.getView().byId("VehicleRCDate").setValue(VehicleRCDate1)
                            }

                            if (ores.results[0].Vehicleinsurance == "" || ores.results[0].Vehicleinsurance == "0.00" || ores.results[0].Vehicleinsurance == null) {
                                this.getView().byId("VehicleInsurance").setValue()
                            } else {
                                const VehicleInsurance = new Date(ores.results[0].Vehicleinsurance);
                                const VehicleInsurance1 = `${VehicleInsurance.getFullYear()}-${VehicleInsurance.getMonth() + 1 < 10 ? '0' : ''}${VehicleInsurance.getMonth() + 1}-${VehicleInsurance.getDate() < 10 ? '0' : ''}${VehicleInsurance.getDate()}`;
                                this.getView().byId("VehicleInsurance").setValue(VehicleInsurance1)
                            }
                            this.getView().byId("VehiclePUCNo").setValue(ores.results[0].Vehiclepuc);

                            this.getView().byId("InvoiceNo").setValue(ores.results[0].Invoice)
                            if (ores.results[0].Invdt == "" || ores.results[0].Invdt == "0.00" || ores.results[0].Invdt == null) {
                                this.getView().byId("InvoiceDate").setValue()
                            } else {
                                const InvoiceDate = new Date(ores.results[0].Invdt);
                                const InvoiceDate1 = `${InvoiceDate.getFullYear()}-${InvoiceDate.getMonth() + 1 < 10 ? '0' : ''}${InvoiceDate.getMonth() + 1}-${InvoiceDate.getDate() < 10 ? '0' : ''}${InvoiceDate.getDate()}`;
                                this.getView().byId("InvoiceDate").setValue(InvoiceDate1)
                            }
                            this.getView().byId("GrossWeight").setValue(ores.results[0].GrossWt)
                            this.getView().byId("TareWeight").setValue(ores.results[0].TareWt)
                            this.getView().byId("NetWaight").setValue(ores.results[0].NetWt)
                            this.getView().byId("TypeofReturn").setValue(ores.results[0].Typeofreturn)

                            for (var D = 0; D < ores.results[0].to_gateitem.results.length; D++) {
                                aTableArr.push({
                                    "BackendDataAvl": true,
                                    "tableFieldEditable": true,
                                    "otherFieldEditable": false,
                                    "PoNumber": ores.results[0].to_gateitem.results[D].Ebeln,
                                    "Item": ores.results[0].to_gateitem.results[D].GateItem,
                                    "VendorCode": ores.results[0].to_gateitem.results[D].Lifnr,
                                    "VendorName": ores.results[0].to_gateitem.results[D].Name1,
                                    "VendorAddress": ores.results[0].to_gateitem.results[D].Address1,
                                    "MaterialCode": ores.results[0].to_gateitem.results[D].Maktx,
                                    "MaterialDescription": ores.results[0].to_gateitem.results[D].Matnr,
                                    "HSNCode": ores.results[0].to_gateitem.results[D].Lpnum,
                                    "GateOutQuantity": ores.results[0].to_gateitem.results[D].OutQty,
                                    "GateQuantity": ores.results[0].to_gateitem.results[D].GateQty,
                                    "BalancedQuantity": ores.results[0].to_gateitem.results[D].OpenQty,
                                    "Unit": ores.results[0].to_gateitem.results[D].Uom,
                                    "Remark": ores.results[0].to_gateitem.results[D].Remark,
                                    "Bill_ChallanNo": ores.results[0].to_gateitem.results[D].Zinvoice,
                                    "Amount": ores.results[0].to_gateitem.results[D].OutValue,
                                })
                            }
                            aTableArr.sort(function (a, b) {
                                return a.Item - b.Item;
                            });
                            oTableModel.setProperty("/aTableData", aTableArr);
                            oBusy.close();
                        }
                    }.bind(this)
                })
            },
            GetTableData: function () {
                var PoNumber = this.getView().byId("PoNumber").getValue();
                if (PoNumber == "") {
                    this.getView().byId("PoNumber").setValueState("Error");
                    MessageBox.error("Please Enter Purchase Order First")
                } else {
                    var oBusy = new sap.m.BusyDialog({
                        text: "Please Wait"
                    });
                    oBusy.open();
                    var Plant = this.getView().byId("Plant").getValue();
                    var PurchaseGroup = this.getView().byId("PurchaseGroup");
                    var oFilter = new sap.ui.model.Filter("PurchaseOrder", "EQ", PoNumber);
                    var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Y1416_GATE");
                    var oTableModel = this.getView().getModel("oTableDataModel");
                    var aTableArr = oTableModel.getProperty("/aTableData");

                    oModel.read("/purchase_ordentity", {
                        filters: [oFilter],
                        urlParameters: {
                            "$top": "5000"
                        },
                        success: function (oresponse) {
                            if (aTableArr.length === 0) {
                                oresponse.results.map(function (items) {
                                    var value = items.PurchasingGroup;
                                    PurchaseGroup.setValue(items.PurchasingGroup);
                                    var obj = {
                                        "BackendDataAvl": false,
                                        "PoNumber": items.PurchaseOrder,
                                        "Item": items.PurchaseOrderItem,
                                        "VendorCode": items.suppliernumber,
                                        "VendorName": items.SupplierName,
                                        "VendorAddress": "",
                                        "MaterialCode": items.Material,
                                        "MaterialDescription": items.ProductName,
                                        "HSNCode": items.ConsumptionTaxCtrlCode,
                                        "GateOutQuantity": items.totalqty1,
                                        "GateQuantity": null,
                                        "BalancedQuantity": null,
                                        "Unit": items.PurchaseOrderQuantityUnit,
                                        "Remark": "",
                                        "Bill_ChallanNo": "",
                                        "Amount": null,
                                        "otherFieldEditable": false,
                                    }
                                    function isObjectInArray(target, array) {
                                        for (var i = 0; i < array.length; i++) {
                                            if (JSON.stringify(array[i]) === JSON.stringify(target)) {
                                                return true;
                                            }
                                        }
                                        return false;
                                    }
                                    var isPresent = isObjectInArray(obj, aTableArr);
                                    if (!isPresent) {
                                        aTableArr.push(obj)
                                    }
                                })
                                oTableModel.setProperty("/aTableData", aTableArr);
                                oBusy.close();
                            } else {
                                oresponse.results.map(function (items) {
                                    var lastGateItem = Number(aTableArr[aTableArr.length - 1].Item);
                                    PurchaseGroup.setValue(items.PurchasingGroup);
                                    var num = items.OrderQuantity;
                                    var oValue = num.indexOf(".");
                                    if (oValue != -1) {
                                        var num1 = num.slice(0, oValue);
                                        var qty = num.slice(oValue, oValue + 3);
                                        var num2 = num1 + qty;
                                        console.log(qty);
                                    } else {
                                        num2 = items.OrderQuantity;
                                    }

                                    var outqty = items.totalqty1;
                                    var value = outqty.indexOf(".");
                                    if (value != -1) {
                                        var quantity = outqty.slice(0, value);
                                        var quantity1 = outqty.slice(value, value + 3);
                                        var quantity2 = quantity + quantity1;

                                    } else {
                                        quantity2 = items.totalqty1;
                                    }
                                    var obj = {
                                        "BackendDataAvl": false,
                                        "PoNumber": items.PurchaseOrder,
                                        "VendorCode": items.suppliernumber,
                                        "VendorName": items.SupplierName,
                                        "VendorAddress": "",
                                        "MaterialCode": items.Material,
                                        "MaterialDescription": items.ProductName,
                                        "HSNCode": items.ConsumptionTaxCtrlCode,
                                        "GateOutQuantity": items.totalqty1,
                                        "GateQuantity": null,
                                        "BalancedQuantity": null,
                                        "Unit": items.PurchaseOrderQuantityUnit,
                                        "Remark": "",
                                        "Bill_ChallanNo": "",
                                        "Amount": null,
                                    }
                                    function isObjectInArray(target, array) {
                                        for (var i = 0; i < array.length; i++) {
                                            var object = {
                                                "BackendDataAvl": false,
                                                "PoNumber": array[i].PurchaseOrder,
                                                "VendorCode": array[i].suppliernumber,
                                                "VendorName": array[i].SupplierName,
                                                "VendorAddress": "",
                                                "MaterialCode": array[i].Material,
                                                "MaterialDescription": array[i].ProductName,
                                                "HSNCode": array[i].ConsumptionTaxCtrlCode,
                                                "GateOutQuantity": array[i].totalqty1,
                                                "GateQuantity": null,
                                                "BalancedQuantity": null,
                                                "Unit": array[i].PurchaseOrderQuantityUnit,
                                                "Remark": "",
                                                "Bill_ChallanNo": "",
                                                "Amount": null,
                                            }
                                            if (JSON.stringify(object) == JSON.stringify(target)) {
                                                return true;
                                            }
                                        }
                                        return false;
                                    }
                                    var isPresent = isObjectInArray(obj, aTableArr);
                                    if (!isPresent) {
                                        obj["Item"] = (lastGateItem + 10).toString();
                                        aTableArr.push(obj)
                                    }
                                })
                                oTableModel.setProperty("/aTableData", aTableArr);
                                oBusy.close();

                            }
                        }.bind(this)
                    })
                }


            },
            AddSingleEmptyRow: function () {
                var oTableModel = this.getView().getModel("oTableDataModel");
                var aTableArr = oTableModel.getProperty("/aTableData");
                if (aTableArr.length != 0) {
                    var len = aTableArr.length;
                    var Item = Number(aTableArr[len - 1].Item)
                    aTableArr.push({
                        "BackendDataAvl": false,
                        "PoNumber": "",
                        "Item": (Item + 10).toString(),
                        "VendorCode": "",
                        "VendorName": "",
                        "VendorAddress": "",
                        "MaterialCode": "",
                        "MaterialDescription": "",
                        "HSNCode": "",
                        "GateOutQuantity": "",
                        "GateQuantity": null,
                        "BalancedQuantity": null,
                        "Unit": "",
                        "Remark": "",
                        "Bill_ChallanNo": "",
                        "otherFieldEditable": true,
                        "Amount": null,
                    })
                } else {
                    aTableArr.push({
                        "BackendDataAvl": false,
                        "PoNumber": "",
                        "Item": "10",
                        "VendorCode": "",
                        "VendorName": "",
                        "VendorAddress": "",
                        "MaterialCode": "",
                        "MaterialDescription": "",
                        "HSNCode": "",
                        "GateOutQuantity": "",
                        "GateQuantity": null,
                        "BalancedQuantity": null,
                        "Unit": "",
                        "Remark": "",
                        "Bill_ChallanNo": "",
                        "otherFieldEditable": true,
                        "Amount": null,
                    })
                }
                oTableModel.setProperty("/aTableData", aTableArr);
            },
            SaveGateEntry: function () {
                var vehicle = this.getView().byId("VehicleNo").getValue();
                var OperatorName = this.getView().byId("OperatorName").getValue();
                var DriverName = this.getView().byId("DriverName").getValue();
                var DriverMobileNo = this.getView().byId("DriverMobileNo").getValue();
                if (DriverName == "" && DriverMobileNo == "" && vehicle != "" && OperatorName != "") {
                    var GateEntryAction = this.getView().getModel("oFirstScrennDataModel").getProperty("/GateEntryAction")
                    if (GateEntryAction === "Create") { this.SaveGateEntryforCreate() }
                    else if (GateEntryAction === "Change") { this.SaveGateEntryforChange() }
                    else if (GateEntryAction === "Gate Out") { this.SaveGateEntryforGateOut() }
                } else {
                    var error = "";
                    if (DriverName == "") { error = error + "Please Enter Driver Name First\n\n"; this.getView().byId("DriverName").setValueState("Error"); }
                    if (DriverMobileNo == "") { error = error + "Please Enter Driver Mobile Number First\n\n"; this.getView().byId("DriverMobileNo").setValueState("Error"); }
                    if (vehicle == "") { error = error + "Please Enter Vehicle Number First\n\n"; this.getView().byId("VehicleNo").setValueState("Error"); }
                    if (OperatorName == "") { error = error + "Please Enter Operator Name First\n\n"; this.getView().byId("OperatorName").setValueState("Error"); }
                    MessageBox.error(error)
                }
            },
            SaveGateEntryforCreate: function () {
                var oBusy = new sap.m.BusyDialog({
                    text: "Please Wait"
                });
                oBusy.open();
                var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Y1416_GATE");
                var oTableModel = this.getView().getModel("oTableDataModel");
                var aTableData = oTableModel.getProperty("/aTableData");
                var aTableArr = [];
                if (this.getView().byId("GateInDate").getValue() != "") {
                    var GateInDate = new Date(this.getView().byId("GateInDate").getValue());
                    var GateInDate1 = new Date(GateInDate.getTime() - GateInDate.getTimezoneOffset() * 60000);
                    var GateInDate2 = GateInDate1.toISOString().slice(0, 16);
                }
                const GateInTime_timeString = this.getView().byId("GateInTime").getValue();
                const [GateInTime_hours, GateInTime_minutes, GateInTime_seconds] = GateInTime_timeString.split(':').map(Number);
                const GateIn_Time = `PT${GateInTime_hours}H${GateInTime_minutes}M${GateInTime_seconds}S`;

                if (this.getView().byId("GateOutDate").getValue() != "") {
                    var GateOutDate = new Date(this.getView().byId("GateOutDate").getValue());
                    var GateOutDate1 = new Date(GateOutDate.getTime() - GateOutDate.getTimezoneOffset() * 60000);
                    var GateOutDate2 = GateOutDate1.toISOString().slice(0, 16);
                }
                const GateOutTime_timeString = this.getView().byId("GateOutTime").getValue();
                const [GateOutTime_hours, GateOutTime_minutes, GateOutTime_seconds] = GateOutTime_timeString.split(':').map(Number);
                const GateOut_Time = `PT${GateOutTime_hours}H${GateOutTime_minutes}M${GateOutTime_seconds}S`;

                if (this.getView().byId("ReportingDate").getValue() != "") {
                    var ReportingDate = new Date(this.getView().byId("ReportingDate").getValue());
                    var ReportingDate1 = new Date(ReportingDate.getTime() - ReportingDate.getTimezoneOffset() * 60000);
                    var ReportingDate2 = ReportingDate1.toISOString().slice(0, 16);
                }

                if (this.getView().byId("InvoiceDate").getValue() != "") {

                    var InvoiceDate = new Date(this.getView().byId("InvoiceDate").getValue());
                    var InvoiceDate1 = new Date(InvoiceDate.getTime() - InvoiceDate.getTimezoneOffset() * 60000);
                    var InvoiceDate2 = InvoiceDate1.toISOString().slice(0, 16);
                }
                if (this.getView().byId("LRDate").getValue() != "") {
                    var LRDate = new Date(this.getView().byId("LRDate").getValue());
                    var LRDate1 = new Date(LRDate.getTime() - LRDate.getTimezoneOffset() * 60000);
                    var LRDate2 = LRDate1.toISOString().slice(0, 16);
                }
                if (this.getView().byId("DriverLicenseExpiryDate").getValue() != "") {
                    var DriverLicenseExpiryDate = new Date(this.getView().byId("DriverLicenseExpiryDate").getValue());
                    var DriverLicenseExpiryDate1 = new Date(DriverLicenseExpiryDate.getTime() - DriverLicenseExpiryDate.getTimezoneOffset() * 60000);
                    var DriverLicenseExpiryDate2 = DriverLicenseExpiryDate1.toISOString().slice(0, 16);
                }
                if (this.getView().byId("VehicleRCDate").getValue() != "") {
                    var VehicleRCDate = new Date(this.getView().byId("VehicleRCDate").getValue());
                    var VehicleRCDate1 = new Date(VehicleRCDate.getTime() - VehicleRCDate.getTimezoneOffset() * 60000);
                    var VehicleRCDate2 = VehicleRCDate1.toISOString().slice(0, 16);
                }
                if (this.getView().byId("VehicleFitnessCertificate").getValue() != "") {
                    var VehicleFitnessCertificate = new Date(this.getView().byId("VehicleFitnessCertificate").getValue());
                    var VehicleFitnessCertificate1 = new Date(VehicleFitnessCertificate.getTime() - VehicleFitnessCertificate.getTimezoneOffset() * 60000);
                    var VehicleFitnessCertificate2 = VehicleFitnessCertificate1.toISOString().slice(0, 16);
                }
                if (this.getView().byId("VehicleInsurance").getValue() != "") {
                    var VehicleInsurance = new Date(this.getView().byId("VehicleInsurance").getValue());
                    var VehicleInsurance1 = new Date(VehicleInsurance.getTime() - VehicleInsurance.getTimezoneOffset() * 60000);
                    var VehicleInsurance2 = VehicleInsurance1.toISOString().slice(0, 16);
                }
                for (var D = 0; D < aTableData.length; D++) {
                    aTableArr.push({
                        "Ebeln": aTableData[D].PoNumber,
                        "GateItem": aTableData[D].Item,
                        "Lifnr": aTableData[D].VendorCode,
                        "Name1": aTableData[D].VendorName,
                        "Address1": aTableData[D].VendorAddress,
                        "Maktx": aTableData[D].MaterialCode,
                        "Matnr": aTableData[D].MaterialDescription,
                        "Lpnum": aTableData[D].HSNCode,
                        "OutQty": aTableData[D].GateOutQuantity,
                        "GateQty": aTableData[D].GateQuantity,
                        "OpenQty": aTableData[D].BalancedQuantity,
                        "Uom": aTableData[D].Unit,
                        "Remark": aTableData[D].Remark,
                        "Zinvoice": aTableData[D].Bill_ChallanNo,
                        "OutValue": aTableData[D].Amount,
                    })
                }
                var companycode = this.getView().getModel("oFirstScrennDataModel").getProperty("/CompanyCode");
                var num = "";
                if (companycode === "1000") {
                    num = "06"
                } else if (companycode === "2000") {
                    num = "13"
                }
                var url1 = "/sap/bc/http/sap/zgatehttp_2022?sap-client=080&numc=";
                var url = url1 + num;
                $.ajax({
                    url: url,
                    type: "GET",
                    beforeSend: function (xhr) {
                        xhr.withCredentials = true;
                    },
                    success: function (result) {
                        this.getView().byId("GateEntryNumber").setValue(result)
                        var oGateEntryData = {
                            "Gateno": this.getView().byId("GateEntryNumber").getValue(),
                            "EntryType": this.getView().byId("GateEntryType").getValue(),
                            "Plant": this.getView().byId("Plant").getValue(),
                            "Entrydate": this.getView().byId("ReportingDate").getValue() == "" || this.getView().byId("ReportingDate").getValue() == "0.00" ? null : ReportingDate2,
                            "Entrytime": null,
                            "VehicalNo": this.getView().byId("VehicleNo").getValue(),
                            "Challan": this.getView().byId("ChallanQty").getValue(),
                            "Operator": this.getView().byId("OperatorName").getValue(),
                            "GateInDt": this.getView().byId("GateInDate").getValue() == "" || this.getView().byId("GateInDate").getValue() == "0.00" ? null : GateInDate2,
                            "GateInTm": this.getView().byId("GateInTime").getValue() == "" || this.getView().byId("GateInTime").getValue() == "0.00" ? null : GateIn_Time,
                            "LrDate": this.getView().byId("LRDate").getValue() == "" || this.getView().byId("LRDate").getValue() == "0.00" ? null : LRDate2,
                            "LrNo": this.getView().byId("LRNumber").getValue(),
                            "Remark": this.getView().byId("Remark").getValue(),
                            "Name1": this.getView().byId("ModeofTransport").getValue(),
                            "TrOper": this.getView().byId("TransporterName").getValue(),
                            "Puchgrp": this.getView().byId("PurchaseGroup").getValue(),
                            "Driver": this.getView().byId("DriverName").getValue(),
                            "Driverno": this.getView().byId("DriverMobileNo").getValue(),
                            "RefGate": this.getView().byId("RefGateNo").getValue(),
                            "DrLisc": this.getView().byId("DriverLicenseNo").getValue(),
                            "Driverlicense": this.getView().byId("DriverLicenseExpiryDate").getValue() == "" || this.getView().byId("DriverLicenseExpiryDate").getValue() == "0.00" ? null : DriverLicenseExpiryDate2,
                            "Driveralcoholic": this.getView().byId("DriverAlcoholic").getSelectedIndex() === 0 ? "Yes" : this.getView().byId("DriverAlcoholic").getSelectedIndex() === 1 ? "No" : "",
                            "Flammablesubstance": this.getView().byId("FlammableSubstance").getSelectedIndex() === 0 ? "Yes" : this.getView().byId("FlammableSubstance").getSelectedIndex() === 1 ? "No" : "",
                            "Firesafety": this.getView().byId("FireSafety").getSelectedIndex() === 0 ? "Yes" : this.getView().byId("FireSafety").getSelectedIndex() === 1 ? "No" : "",
                            "Reversehorn": this.getView().byId("ReverseHorn").getSelectedIndex() === 0 ? "Yes" : this.getView().byId("ReverseHorn").getSelectedIndex() === 1 ? "No" : "",
                            "Vehiclefitness": this.getView().byId("VehicleFitnessCertificate").getValue() == "" || this.getView().byId("VehicleFitnessCertificate").getValue() == "0.00" ? null : VehicleFitnessCertificate2,
                            "Vehiclercdate": this.getView().byId("VehicleRCDate").getValue() == "" || this.getView().byId("VehicleRCDate").getValue() == "0.00" ? null : VehicleRCDate2,
                            "Vehicleinsurance": this.getView().byId("VehicleInsurance").getValue() == "" || this.getView().byId("VehicleInsurance").getValue() == "0.00" ? null : VehicleInsurance2,
                            "Vehiclepuc": this.getView().byId("VehiclePUCNo").getValue(),
                            "GateOutDt": this.getView().byId("GateOutDate").getValue() == "" || this.getView().byId("GateOutDate").getValue() == "0.00" ? null : GateOutDate2,
                            "GateOutTm": this.getView().byId("GateOutTime").getValue() == "" || this.getView().byId("GateOutTime").getValue() == "0.00" ? null : GateOut_Time,
                            "Invdt": this.getView().byId("InvoiceDate").getValue() == "" || this.getView().byId("InvoiceDate").getValue() == "0.00" ? null : InvoiceDate2,
                            "Invoice": this.getView().byId("InvoiceNo").getValue(),
                            "GrossWt": (this.getView().byId("GrossWeight").getValue()).length === 0 ? "0.00" : this.getView().byId("GrossWeight").getValue(),
                            "TareWt": (this.getView().byId("TareWeight").getValue()).length === 0 ? "0.00" : this.getView().byId("TareWeight").getValue(),
                            "NetWt": (this.getView().byId("NetWaight").getValue()).length === 0 ? "0.00" : this.getView().byId("NetWaight").getValue(),
                            "Typeofreturn": this.getView().byId("TypeofReturn").getValue(),
                            "to_gateitem": {
                                results: aTableArr
                            }
                        }
                        oModel.create("/zgat", oGateEntryData, {
                            method: "POST",
                            success: function (data) {
                                oBusy.close();
                                MessageBox.success("Gate Number. " + result + " generated successfully!", {
                                    onClose: function (oAction) {
                                        if (oAction === MessageBox.Action.OK) {
                                            var oHistory = sap.ui.core.routing.History.getInstance();
                                            var sPreviousHash = oHistory.getPreviousHash();

                                            if (sPreviousHash !== undefined) {
                                                window.history.go(-1);
                                            } else {
                                                var oRouter = this.getOwnerComponent().getRouter();
                                                oRouter.navTo("FirstScreen", {}, true);
                                            }
                                        }
                                    }.bind(this)
                                });
                            }.bind(this),
                            error: function (e) {
                                oBusy.close();
                                // alert("error");
                            }
                        });
                    }.bind(this)
                });
            },
            SaveGateEntryforChange: function () {
                var oBusy = new sap.m.BusyDialog({
                    text: "Please Wait"
                });
                oBusy.open();
                var gateEntryNumber = this.getView().byId("GateEntryNumber").getValue();
                if (this.getView().byId("GateInDate").getValue() != "") {
                    var GateInDate = new Date(this.getView().byId("GateInDate").getValue());
                    var GateInDate1 = new Date(GateInDate.getTime() - GateInDate.getTimezoneOffset() * 60000);
                    var GateInDate2 = GateInDate1.toISOString().slice(0, 16);
                }
                const GateInTime_timeString = this.getView().byId("GateInTime").getValue();
                const [GateInTime_hours, GateInTime_minutes, GateInTime_seconds] = GateInTime_timeString.split(':').map(Number);
                const GateIn_Time = `PT${GateInTime_hours}H${GateInTime_minutes}M${GateInTime_seconds}S`;

                if (this.getView().byId("GateOutDate").getValue() != "") {
                    var GateOutDate = new Date(this.getView().byId("GateOutDate").getValue());
                    var GateOutDate1 = new Date(GateOutDate.getTime() - GateOutDate.getTimezoneOffset() * 60000);
                    var GateOutDate2 = GateOutDate1.toISOString().slice(0, 16);
                }
                const GateOutTime_timeString = this.getView().byId("GateOutTime").getValue();
                const [GateOutTime_hours, GateOutTime_minutes, GateOutTime_seconds] = GateOutTime_timeString.split(':').map(Number);
                const GateOut_Time = `PT${GateOutTime_hours}H${GateOutTime_minutes}M${GateOutTime_seconds}S`;

                if (this.getView().byId("ReportingDate").getValue() != "") {
                    var ReportingDate = new Date(this.getView().byId("ReportingDate").getValue());
                    var ReportingDate1 = new Date(ReportingDate.getTime() - ReportingDate.getTimezoneOffset() * 60000);
                    var ReportingDate2 = ReportingDate1.toISOString().slice(0, 16);
                }

                if (this.getView().byId("InvoiceDate").getValue() != "") {

                    var InvoiceDate = new Date(this.getView().byId("InvoiceDate").getValue());
                    var InvoiceDate1 = new Date(InvoiceDate.getTime() - InvoiceDate.getTimezoneOffset() * 60000);
                    var InvoiceDate2 = InvoiceDate1.toISOString().slice(0, 16);
                }
                if (this.getView().byId("LRDate").getValue() != "") {
                    var LRDate = new Date(this.getView().byId("LRDate").getValue());
                    var LRDate1 = new Date(LRDate.getTime() - LRDate.getTimezoneOffset() * 60000);
                    var LRDate2 = LRDate1.toISOString().slice(0, 16);
                }
                if (this.getView().byId("DriverLicenseExpiryDate").getValue() != "") {
                    var DriverLicenseExpiryDate = new Date(this.getView().byId("DriverLicenseExpiryDate").getValue());
                    var DriverLicenseExpiryDate1 = new Date(DriverLicenseExpiryDate.getTime() - DriverLicenseExpiryDate.getTimezoneOffset() * 60000);
                    var DriverLicenseExpiryDate2 = DriverLicenseExpiryDate1.toISOString().slice(0, 16);
                }
                if (this.getView().byId("VehicleRCDate").getValue() != "") {
                    var VehicleRCDate = new Date(this.getView().byId("VehicleRCDate").getValue());
                    var VehicleRCDate1 = new Date(VehicleRCDate.getTime() - VehicleRCDate.getTimezoneOffset() * 60000);
                    var VehicleRCDate2 = VehicleRCDate1.toISOString().slice(0, 16);
                }
                if (this.getView().byId("VehicleFitnessCertificate").getValue() != "") {
                    var VehicleFitnessCertificate = new Date(this.getView().byId("VehicleFitnessCertificate").getValue());
                    var VehicleFitnessCertificate1 = new Date(VehicleFitnessCertificate.getTime() - VehicleFitnessCertificate.getTimezoneOffset() * 60000);
                    var VehicleFitnessCertificate2 = VehicleFitnessCertificate1.toISOString().slice(0, 16);
                }
                if (this.getView().byId("VehicleInsurance").getValue() != "") {
                    var VehicleInsurance = new Date(this.getView().byId("VehicleInsurance").getValue());
                    var VehicleInsurance1 = new Date(VehicleInsurance.getTime() - VehicleInsurance.getTimezoneOffset() * 60000);
                    var VehicleInsurance2 = VehicleInsurance1.toISOString().slice(0, 16);
                }
                var oGateEntryHeaderData = {
                    "Gateno": this.getView().byId("GateEntryNumber").getValue(),
                    "EntryType": this.getView().byId("GateEntryType").getValue(),
                    "Plant": this.getView().byId("Plant").getValue(),
                    "Entrydate": this.getView().byId("ReportingDate").getValue() == "" || this.getView().byId("ReportingDate").getValue() == "0.00" ? null : ReportingDate2,
                    "Entrytime": null,
                    "VehicalNo": this.getView().byId("VehicleNo").getValue(),
                    "Challan": this.getView().byId("ChallanQty").getValue(),
                    "Operator": this.getView().byId("OperatorName").getValue(),
                    "GateInDt": this.getView().byId("GateInDate").getValue() == "" || this.getView().byId("GateInDate").getValue() == "0.00" ? null : GateInDate2,
                    "GateInTm": this.getView().byId("GateInTime").getValue() == "" || this.getView().byId("GateInTime").getValue() == "0.00" ? null : GateIn_Time,
                    "LrDate": this.getView().byId("LRDate").getValue() == "" || this.getView().byId("LRDate").getValue() == "0.00" ? null : LRDate2,
                    "LrNo": this.getView().byId("LRNumber").getValue(),
                    "Remark": this.getView().byId("Remark").getValue(),
                    "Name1": this.getView().byId("ModeofTransport").getValue(),
                    "TrOper": this.getView().byId("TransporterName").getValue(),
                    "Puchgrp": this.getView().byId("PurchaseGroup").getValue(),
                    "Driver": this.getView().byId("DriverName").getValue(),
                    "Driverno": this.getView().byId("DriverMobileNo").getValue(),
                    "RefGate": this.getView().byId("RefGateNo").getValue(),
                    "DrLisc": this.getView().byId("DriverLicenseNo").getValue(),
                    "Driverlicense": this.getView().byId("DriverLicenseExpiryDate").getValue() == "" || this.getView().byId("DriverLicenseExpiryDate").getValue() == "0.00" ? null : DriverLicenseExpiryDate2,
                    "Driveralcoholic": this.getView().byId("DriverAlcoholic").getSelectedIndex() === 0 ? "Yes" : this.getView().byId("DriverAlcoholic").getSelectedIndex() === 1 ? "No" : "",
                    "Flammablesubstance": this.getView().byId("FlammableSubstance").getSelectedIndex() === 0 ? "Yes" : this.getView().byId("FlammableSubstance").getSelectedIndex() === 1 ? "No" : "",
                    "Firesafety": this.getView().byId("FireSafety").getSelectedIndex() === 0 ? "Yes" : this.getView().byId("FireSafety").getSelectedIndex() === 1 ? "No" : "",
                    "Reversehorn": this.getView().byId("ReverseHorn").getSelectedIndex() === 0 ? "Yes" : this.getView().byId("ReverseHorn").getSelectedIndex() === 1 ? "No" : "",
                    "Vehiclefitness": this.getView().byId("VehicleFitnessCertificate").getValue() == "" || this.getView().byId("VehicleFitnessCertificate").getValue() == "0.00" ? null : VehicleFitnessCertificate2,
                    "Vehiclercdate": this.getView().byId("VehicleRCDate").getValue() == "" || this.getView().byId("VehicleRCDate").getValue() == "0.00" ? null : VehicleRCDate1,
                    "Vehicleinsurance": this.getView().byId("VehicleInsurance").getValue() == "" || this.getView().byId("VehicleInsurance").getValue() == "0.00" ? null : VehicleInsurance2,
                    "Vehiclepuc": this.getView().byId("VehiclePUCNo").getValue(),
                    "GateOutDt": this.getView().byId("GateOutDate").getValue() == "" || this.getView().byId("GateOutDate").getValue() == "0.00" ? null : GateOutDate2,
                    "GateOutTm": this.getView().byId("GateOutTime").getValue() == "" || this.getView().byId("GateOutTime").getValue() == "0.00" ? null : GateOut_Time,
                    "Invdt": this.getView().byId("InvoiceDate").getValue() == "" || this.getView().byId("InvoiceDate").getValue() == "0.00" ? null : InvoiceDate2,
                    "Invoice": this.getView().byId("InvoiceNo").getValue(),
                    "GrossWt": (this.getView().byId("GrossWeight").getValue()).length === 0 ? "0.00" : this.getView().byId("GrossWeight").getValue(),
                    "TareWt": (this.getView().byId("TareWeight").getValue()).length === 0 ? "0.00" : this.getView().byId("TareWeight").getValue(),
                    "NetWt": (this.getView().byId("NetWaight").getValue()).length === 0 ? "0.00" : this.getView().byId("NetWaight").getValue(),
                    "Typeofreturn": this.getView().byId("TypeofReturn").getValue(),
                }
                var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Y1416_GATE");
                var oTableModel = this.getView().getModel("oTableDataModel");
                var aTableData = oTableModel.getProperty("/aTableData");
                if (aTableData.length === 0) {
                    oModel.update("/zgat(Gateno='" + gateEntryNumber + "')", oGateEntryHeaderData, {
                        success: function (data) {
                            oBusy.close();
                            MessageBox.success("Gate Number " + gateEntryNumber + " Updated Successfully!", {
                                onClose: function (oAction) {
                                    if (oAction === MessageBox.Action.OK) {
                                        var oHistory = sap.ui.core.routing.History.getInstance();
                                        var sPreviousHash = oHistory.getPreviousHash();

                                        if (sPreviousHash !== undefined) {
                                            window.history.go(-1);
                                        } else {
                                            var oRouter = this.getOwnerComponent().getRouter();
                                            oRouter.navTo("FirstScreen", {}, true);
                                        }
                                    }
                                }.bind(this)
                            });
                            // alert("success");
                        }.bind(this),
                        error: function (e) {
                            oBusy.close();
                            alert("error");
                        }
                    });
                } else {
                    // oBusy.close();
                    aTableData.map(function (item, index, arr) {
                        var obj = {
                            "Gateno": gateEntryNumber,
                            "Ebeln": item.PoNumber,
                            "GateItem": item.Item,
                            "Lifnr": item.VendorCode,
                            "Name1": item.VendorName,
                            "Address1": item.VendorAddress,
                            "Maktx": item.MaterialCode,
                            "Matnr": item.MaterialDescription,
                            "Lpnum": item.HSNCode,
                            "OutQty": item.GateOutQuantity,
                            "GateQty": item.GateQuantity,
                            "OpenQty": item.BalancedQuantity,
                            "Uom": item.Unit,
                            "Remark": item.Remark,
                            "Zinvoice": item.Bill_ChallanNo,
                            "OutValue": item.Amount,
                        }
                        if (item.BackendDataAvl === true) {
                            oModel.update("/zgateitem_ent(Gateno='" + gateEntryNumber + "',GateItem='" + item.Item + "')", obj, {
                                success: function (data) {
                                    if (index === arr.length - 1) {
                                        oModel.update("/zgatehead(Gateno='" + gateEntryNumber + "')", oGateEntryHeaderData, {
                                            success: function (data) {
                                                oBusy.close();
                                                MessageBox.success("Gate Number " + gateEntryNumber + " Updated Successfully!", {
                                                    onClose: function (oAction) {
                                                        if (oAction === MessageBox.Action.OK) {
                                                            var oHistory = sap.ui.core.routing.History.getInstance();
                                                            var sPreviousHash = oHistory.getPreviousHash();

                                                            if (sPreviousHash !== undefined) {
                                                                window.history.go(-1);
                                                            } else {
                                                                var oRouter = this.getOwnerComponent().getRouter();
                                                                oRouter.navTo("FirstScreen", {}, true);
                                                            }
                                                        }
                                                    }.bind(this)
                                                });
                                            }.bind(this),
                                            error: function (e) {
                                                oBusy.close();
                                                alert("error");
                                            }
                                        });

                                    }
                                },
                                error: function (e) {
                                    oBusy.close();
                                }
                            });
                        } else {
                            oModel.create("/zgateitem_ent", obj, {
                                success: function (data) {
                                    if (index === arr.length - 1) {
                                        oModel.update("/zgatehead(Gateno='" + gateEntryNumber + "')", oGateEntryHeaderData, {
                                            success: function (data) {
                                                oBusy.close();
                                                MessageBox.success("Gate Number " + gateEntryNumber + " Updated Successfully!", {
                                                    onClose: function (oAction) {
                                                        if (oAction === MessageBox.Action.OK) {
                                                            var oHistory = sap.ui.core.routing.History.getInstance();
                                                            var sPreviousHash = oHistory.getPreviousHash();

                                                            if (sPreviousHash !== undefined) {
                                                                window.history.go(-1);
                                                            } else {
                                                                var oRouter = this.getOwnerComponent().getRouter();
                                                                oRouter.navTo("FirstScreen", {}, true);
                                                            }
                                                        }
                                                    }.bind(this)
                                                });
                                                // alert("success");
                                            }.bind(this),
                                            error: function (e) {
                                                oBusy.close();
                                                alert("error");
                                            }
                                        });

                                    }
                                },
                                error: function (e) {
                                    oBusy.close();
                                }
                            });
                        }
                    });

                }
            },
            SaveGateEntryforGateOut: function () {
                var oBusy = new sap.m.BusyDialog({
                    text: "Please Wait"
                });
                oBusy.open();
                var gateEntryNumber = this.getView().byId("GateEntryNumber").getValue();
                const ReportingDate = new Date(this.getView().byId("ReportingDate").getValue());
                const ReportingDate1 = `${ReportingDate.getFullYear()}-${ReportingDate.getMonth() + 1 < 10 ? '0' : ''}${ReportingDate.getMonth() + 1}-${ReportingDate.getDate() < 10 ? '0' : ''}${ReportingDate.getDate()}`;

                const GateInTime_timeString = this.getView().byId("GateInTime").getValue();
                const [GateInTime_hours, GateInTime_minutes, GateInTime_seconds] = GateInTime_timeString.split(':').map(Number);
                const GateIn_Time = `PT${GateInTime_hours}H${GateInTime_minutes}M${GateInTime_seconds}S`;
                const GateInDate = new Date(this.getView().byId("GateInDate").getValue());
                const GateInDate1 = `${GateInDate.getFullYear()}-${GateInDate.getMonth() + 1 < 10 ? '0' : ''}${GateInDate.getMonth() + 1}-${GateInDate.getDate() < 10 ? '0' : ''}${GateInDate.getDate()}`;

                const GateOutTime_timeString = this.getView().byId("GateOutTime").getValue();
                const [GateOutTime_hours, GateOutTime_minutes, GateOutTime_seconds] = GateOutTime_timeString.split(':').map(Number);
                const GateOut_Time = `PT${GateOutTime_hours}H${GateOutTime_minutes}M${GateOutTime_seconds}S`;
                const GateOutDate = new Date(this.getView().byId("GateOutDate").getValue());
                const GateOutDate1 = `${GateOutDate.getFullYear()}-${GateOutDate.getMonth() + 1 < 10 ? '0' : ''}${GateOutDate.getMonth() + 1}-${GateOutDate.getDate() < 10 ? '0' : ''}${GateOutDate.getDate()}`;


                const InvoiceDate = new Date(this.getView().byId("InvoiceDate").getValue());
                const InvoiceDate1 = `${InvoiceDate.getFullYear()}-${InvoiceDate.getMonth() + 1 < 10 ? '0' : ''}${InvoiceDate.getMonth() + 1}-${InvoiceDate.getDate() < 10 ? '0' : ''}${InvoiceDate.getDate()}`;

                const LRDate = new Date(this.getView().byId("LRDate").getValue());
                const LRDate1 = `${LRDate.getFullYear()}-${LRDate.getMonth() + 1 < 10 ? '0' : ''}${LRDate.getMonth() + 1}-${LRDate.getDate() < 10 ? '0' : ''}${LRDate.getDate()}`;

                const DriverLicenseExpiryDate = new Date(this.getView().byId("DriverLicenseExpiryDate").getValue());
                const DriverLicenseExpiryDate1 = `${DriverLicenseExpiryDate.getFullYear()}-${DriverLicenseExpiryDate.getMonth() + 1 < 10 ? '0' : ''}${DriverLicenseExpiryDate.getMonth() + 1}-${DriverLicenseExpiryDate.getDate() < 10 ? '0' : ''}${DriverLicenseExpiryDate.getDate()}`;

                const VehicleFitnessCertificate = new Date(this.getView().byId("VehicleFitnessCertificate").getValue());
                const VehicleFitnessCertificate1 = `${VehicleFitnessCertificate.getFullYear()}-${VehicleFitnessCertificate.getMonth() + 1 < 10 ? '0' : ''}${VehicleFitnessCertificate.getMonth() + 1}-${VehicleFitnessCertificate.getDate() < 10 ? '0' : ''}${VehicleFitnessCertificate.getDate()}`;

                const VehicleInsurance = new Date(this.getView().byId("VehicleInsurance").getValue());
                const VehicleInsurance1 = `${VehicleInsurance.getFullYear()}-${VehicleInsurance.getMonth() + 1 < 10 ? '0' : ''}${VehicleInsurance.getMonth() + 1}-${VehicleInsurance.getDate() < 10 ? '0' : ''}${VehicleInsurance.getDate()}`;

                const VehicleRCDate = new Date(this.getView().byId("VehicleRCDate").getValue());
                const VehicleRCDate1 = `${VehicleRCDate.getFullYear()}-${VehicleRCDate.getMonth() + 1 < 10 ? '0' : ''}${VehicleRCDate.getMonth() + 1}-${VehicleRCDate.getDate() < 10 ? '0' : ''}${VehicleRCDate.getDate()}`;

                var oGateEntryHeaderData = {
                    "Gateno": this.getView().byId("GateEntryNumber").getValue(),
                    "EntryType": this.getView().byId("GateEntryType").getValue(),
                    "Plant": this.getView().byId("Plant").getValue(),
                    "Entrydate": this.getView().byId("ReportingDate").getValue() == "" || this.getView().byId("ReportingDate").getValue() == "0.00" ? null : ReportingDate1,
                    "Entrytime": null,
                    "VehicalNo": this.getView().byId("VehicleNo").getValue(),
                    "Challan": this.getView().byId("ChallanQty").getValue(),
                    "Operator": this.getView().byId("OperatorName").getValue(),
                    "GateInDt": this.getView().byId("GateInDate").getValue() == "" || this.getView().byId("GateInDate").getValue() == "0.00" ? null : GateInDate1,
                    "GateInTm": this.getView().byId("GateInTime").getValue() == "" || this.getView().byId("GateInTime").getValue() == "0.00" ? null : GateIn_Time,
                    "LrDate": this.getView().byId("LRDate").getValue() == "" || this.getView().byId("LRDate").getValue() == "0.00" ? null : LRDate1,
                    "LrNo": this.getView().byId("LRNumber").getValue(),
                    "Remark": this.getView().byId("Remark").getValue(),
                    "Name1": this.getView().byId("ModeofTransport").getValue(),
                    "TrOper": this.getView().byId("TransporterName").getValue(),
                    "Puchgrp": this.getView().byId("PurchaseGroup").getValue(),
                    "Driver": this.getView().byId("DriverName").getValue(),
                    "Driverno": this.getView().byId("DriverMobileNo").getValue(),
                    "RefGate": this.getView().byId("RefGateNo").getValue(),
                    "DrLisc": this.getView().byId("DriverLicenseNo").getValue(),
                    "Driverlicense": this.getView().byId("DriverLicenseExpiryDate").getValue() == "" || this.getView().byId("DriverLicenseExpiryDate").getValue() == "0.00" ? null : DriverLicenseExpiryDate1,
                    "Driveralcoholic": this.getView().byId("DriverAlcoholic").getSelectedIndex() === 0 ? "Yes" : this.getView().byId("DriverAlcoholic").getSelectedIndex() === 1 ? "No" : "",
                    "Flammablesubstance": this.getView().byId("FlammableSubstance").getSelectedIndex() === 0 ? "Yes" : this.getView().byId("FlammableSubstance").getSelectedIndex() === 1 ? "No" : "",
                    "Firesafety": this.getView().byId("FireSafety").getSelectedIndex() === 0 ? "Yes" : this.getView().byId("FireSafety").getSelectedIndex() === 1 ? "No" : "",
                    "Reversehorn": this.getView().byId("ReverseHorn").getSelectedIndex() === 0 ? "Yes" : this.getView().byId("ReverseHorn").getSelectedIndex() === 1 ? "No" : "",
                    "Vehiclefitness": this.getView().byId("VehicleFitnessCertificate").getValue() == "" || this.getView().byId("VehicleFitnessCertificate").getValue() == "0.00" ? null : VehicleFitnessCertificate1,
                    "Vehiclercdate": this.getView().byId("VehicleRCDate").getValue() == "" || this.getView().byId("VehicleRCDate").getValue() == "0.00" ? null : VehicleRCDate1,
                    "Vehicleinsurance": this.getView().byId("VehicleInsurance").getValue() == "" || this.getView().byId("VehicleInsurance").getValue() == "0.00" ? null : VehicleInsurance1,
                    "Vehiclepuc": this.getView().byId("VehiclePUCNo").getValue(),
                    "GateOutDt": this.getView().byId("GateOutDate").getValue() == "" || this.getView().byId("GateOutDate").getValue() == "0.00" ? null : GateOutDate1,
                    "GateOutTm": this.getView().byId("GateOutTime").getValue() == "" || this.getView().byId("GateOutTime").getValue() == "0.00" ? null : GateOut_Time,
                    "Invdt": this.getView().byId("InvoiceDate").getValue() == "" || this.getView().byId("InvoiceDate").getValue() == "0.00" ? null : InvoiceDate1,
                    "Invoice": this.getView().byId("InvoiceNo").getValue(),
                    "GrossWt": (this.getView().byId("GrossWeight").getValue()).length === 0 ? "0.00" : this.getView().byId("GrossWeight").getValue(),
                    "TareWt": (this.getView().byId("TareWeight").getValue()).length === 0 ? "0.00" : this.getView().byId("TareWeight").getValue(),
                    "NetWt": (this.getView().byId("NetWaight").getValue()).length === 0 ? "0.00" : this.getView().byId("NetWaight").getValue(),
                    "Typeofreturn": this.getView().byId("TypeofReturn").getValue(),
                }
                var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Y1416_GATE");
                var oTableModel = this.getView().getModel("oTableDataModel");
                var aTableData = oTableModel.getProperty("/aTableData");
                if (aTableData.length === 0) {
                    oModel.update("/zgat(Gateno='" + gateEntryNumber + "')", oGateEntryHeaderData, {
                        success: function (data) {
                            oBusy.close();
                            MessageBox.success("Gate Number " + gateEntryNumber + " Updated Successfully!", {
                                onClose: function (oAction) {
                                    if (oAction === MessageBox.Action.OK) {
                                        var oHistory = sap.ui.core.routing.History.getInstance();
                                        var sPreviousHash = oHistory.getPreviousHash();

                                        if (sPreviousHash !== undefined) {
                                            window.history.go(-1);
                                        } else {
                                            var oRouter = this.getOwnerComponent().getRouter();
                                            oRouter.navTo("FirstScreen", {}, true);
                                        }
                                    }
                                }.bind(this)
                            });
                            // alert("success");
                        }.bind(this),
                        error: function (e) {
                            oBusy.close();
                            alert("error");
                        }
                    });
                } else {
                    // oBusy.close();
                    aTableData.map(function (item, index, arr) {
                        var obj = {
                            "Gateno": gateEntryNumber,
                            "Ebeln": item.PoNumber,
                            "Ebelp": item.PoLineItem,
                            "GateItem": item.GateItem,
                            "Lifnr": item.VendorCode,
                            "Name1": item.VendorName,
                            "Matnr": item.MaterialCode,
                            "Maktx": item.MaterialDescription,
                            "OrderQty": item.OrderQuantity,
                            "NetPriceAmount": item.UnitPriceinPo,
                            "GateQty": item.GateQuantity,
                            "OpenQty": item.GateDoneQuantity,
                            "Uom": item.Unit,
                            "Remark": item.Remarks,
                        }
                        if (item.BackendDataAvl === true) {
                            oModel.update("/zgateitem_ent(Gateno='" + gateEntryNumber + "',GateItem='" + item.Item + "')", obj, {
                                success: function (data) {
                                    if (index === arr.length - 1) {
                                        oModel.update("/zgatehead(Gateno='" + gateEntryNumber + "')", oGateEntryHeaderData, {
                                            success: function (data) {
                                                oBusy.close();
                                                MessageBox.success("Gate Number " + gateEntryNumber + " Updated Successfully!", {
                                                    onClose: function (oAction) {
                                                        if (oAction === MessageBox.Action.OK) {
                                                            var oHistory = sap.ui.core.routing.History.getInstance();
                                                            var sPreviousHash = oHistory.getPreviousHash();

                                                            if (sPreviousHash !== undefined) {
                                                                window.history.go(-1);
                                                            } else {
                                                                var oRouter = this.getOwnerComponent().getRouter();
                                                                oRouter.navTo("FirstScreen", {}, true);
                                                            }
                                                        }
                                                    }.bind(this)
                                                });
                                            }.bind(this),
                                            error: function (e) {
                                                oBusy.close();
                                                alert("error");
                                            }
                                        });

                                    }
                                },
                                error: function (e) {
                                    oBusy.close();
                                }
                            });
                        } else {
                            oModel.create("/zgateitem_ent", obj, {
                                success: function (data) {
                                    if (index === arr.length - 1) {
                                        oModel.update("/zgatehead(Gateno='" + gateEntryNumber + "')", oGateEntryHeaderData, {
                                            success: function (data) {
                                                oBusy.close();
                                                MessageBox.success("Gate Number " + gateEntryNumber + " Updated Successfully!", {
                                                    onClose: function (oAction) {
                                                        if (oAction === MessageBox.Action.OK) {
                                                            var oHistory = sap.ui.core.routing.History.getInstance();
                                                            var sPreviousHash = oHistory.getPreviousHash();

                                                            if (sPreviousHash !== undefined) {
                                                                window.history.go(-1);
                                                            } else {
                                                                var oRouter = this.getOwnerComponent().getRouter();
                                                                oRouter.navTo("FirstScreen", {}, true);
                                                            }
                                                        }
                                                    }.bind(this)
                                                });
                                                // alert("success");
                                            }.bind(this),
                                            error: function (e) {
                                                oBusy.close();
                                                alert("error");
                                            }
                                        });

                                    }
                                },
                                error: function (e) {
                                    oBusy.close();
                                }
                            });
                        }
                    });

                }
            },
            DeleteTables_SelectedRow_Button_Visible: function () {
                var GateEntryAction = this.getView().getModel("oFirstScrennDataModel").getProperty("/GateEntryAction")
                if (GateEntryAction != "Display") {
                    var oTable = this.getView().byId("LoanGateTypeTable").getSelectedIndices();
                    if (oTable.length > 0) {
                        this.getView().byId("Table_DeleteButton").setVisible(true)
                    } else {
                        this.getView().byId("Table_DeleteButton").setVisible(false)
                    }
                }
            },
            DeleteTables_SelectedRow: function (oEvent) {
                var oBusy = new sap.m.BusyDialog({
                    text: "Please Wait"
                });
                oBusy.open();
                var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Y1416_GATE");
                var gateEntryNumber = this.getView().byId("GateEntryNumber").getValue();
                var oTable = this.getView().byId("LoanGateTypeTable");
                var aSelectedIndex = oTable.getSelectedIndices();
                var oTableDataModel = this.getView().getModel("oTableDataModel");
                var aTableArr = oTableDataModel.getProperty("/aTableData");
                MessageBox.warning("Are you Sure You Went to Delete", {
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    emphasizedAction: MessageBox.Action.YES,
                    onClose: function (sAction) {
                        if (sAction === "YES") {
                            aSelectedIndex.map(function (item, index, arr) {
                                if (aTableArr[item].BackendDataAvl === true) {
                                    oModel.remove("/zgateitem_ent(Gateno='" + gateEntryNumber + "',GateItem='" + aTableArr[item].Item + "')", {
                                        success: function (oresponse) {
                                            if (index === arr.length - 1) {
                                                oBusy.close();
                                                let newArray = aTableArr.filter((element, index) => !aSelectedIndex.includes(index));
                                                oTableDataModel.setProperty("/aTableData", newArray)
                                                MessageToast.show("Data Deleted");
                                            }
                                        },
                                        error: function () {
                                            oBusy.close();
                                            MessageToast.show("Data not Deleted")
                                        }
                                    })
                                } else if (aTableArr[item].BackendDataAvl === false) {
                                    if (index === arr.length - 1) {
                                        oBusy.close();
                                        let newArray = aTableArr.filter((element, index) => !aSelectedIndex.includes(index));
                                        oTableDataModel.setProperty("/aTableData", newArray)
                                        MessageToast.show("Data Deleted");
                                    }
                                }
                            })

                        } else {
                            oBusy.close();
                        }
                    }
                });
            },

            valueStatefor_VehicleNo: function (oEvent) {
                if (oEvent.mParameters.value) {
                    this.getView().byId("VehicleNo").setValueState("None");
                } else {
                    this.getView().byId("VehicleNo").setValueState("Error");
                }
            },
            valueStatefor_OperatorName: function (oEvent) {
                if (oEvent.mParameters.value) {
                    this.getView().byId("OperatorName").setValueState("None");
                } else {
                    this.getView().byId("OperatorName").setValueState("Error");
                }
            },
            valueStatefor_PoNumber: function (oEvent) {
                if (oEvent.mParameters.value) {
                    this.getView().byId("PoNumber").setValueState("None");
                } else {
                    this.getView().byId("PoNumber").setValueState("Error");
                }
            },
            valueStatefor_DriverMobileNo: function (oEvent) {
                if (oEvent.mParameters.value) {
                    this.getView().byId("DriverMobileNo").setValueState("None");
                } else {
                    this.getView().byId("DriverMobileNo").setValueState("Error");
                }
            },
            valueStatefor_DriverName: function (oEvent) {
                if (oEvent.mParameters.value) {
                    this.getView().byId("DriverName").setValueState("None");
                } else {
                    this.getView().byId("DriverName").setValueState("Error");
                }
            },

            netWeightCalculate_byGrossWaight: function (oEvent) {
                var grossWeight = Number(oEvent.mParameters.value);
                var tareWeight = Number(this.getView().byId("TareWeight").getValue());
                if (tareWeight != 0) {
                    if (grossWeight < tareWeight) {
                        var oMessageStrip = this.byId("ValidWeight_MessageStrip");
                        oMessageStrip.setText("Gross Weight Can't be Less Then Tare Weight!!!");
                        oMessageStrip.setType("Error")
                        oMessageStrip.setVisible(true);
                    } else if (grossWeight == tareWeight) {
                        var oMessageStrip = this.byId("ValidWeight_MessageStrip");
                        oMessageStrip.setText("Gross Weight Can't be Equal to Tare Weight");
                        oMessageStrip.setType("Error")
                        oMessageStrip.setVisible(true);
                    } else {
                        var oMessageStrip = this.byId("ValidWeight_MessageStrip");
                        oMessageStrip.setText();
                        oMessageStrip.setType("Success")
                        oMessageStrip.setVisible(false);
                        var netWeight = grossWeight - tareWeight;
                        this.getView().byId("NetWaight").setValue(netWeight)
                    }
                }
            },
            netWeightCalculate_byTareWaight: function (oEvent) {
                var tareWeight = Number(oEvent.mParameters.value);
                var grossWeight = Number(this.getView().byId("GrossWeight").getValue());
                if (grossWeight < tareWeight) {
                    var oMessageStrip = this.byId("ValidWeight_MessageStrip");
                    oMessageStrip.setText("Gross Weight Can't be Less Then Tare Weight!!!");
                    oMessageStrip.setType("Error")
                    oMessageStrip.setVisible(true);
                } else if (grossWeight == tareWeight) {
                    var oMessageStrip = this.byId("ValidWeight_MessageStrip");
                    oMessageStrip.setText("Gross Weight Can't be Equal to Tare Weight");
                    oMessageStrip.setType("Error")
                    oMessageStrip.setVisible(true);
                } else {
                    var oMessageStrip = this.byId("ValidWeight_MessageStrip");
                    oMessageStrip.setText();
                    oMessageStrip.setType("Success")
                    oMessageStrip.setVisible(false);
                    var netWeight = grossWeight - tareWeight;
                    this.getView().byId("NetWaight").setValue(netWeight)
                }
            },




            //Call Value Help Dialog Box
            onValueHelpRequest: function (oEvent) {
                var oView = this.getView();
                this.oSource = oEvent.getSource();
                this.sPath = oEvent.getSource().getBindingContext('oTableDataModel').getPath();
                var sKey = this.oSource.getCustomData()[0].getKey();
                this.sKey = this.oSource.getCustomData()[0].getKey();
                if (!this._pValueHelpDialog) {
                    this._pValueHelpDialog = Fragment.load({
                        id: oView.getId(),
                        name: "zgateentry.fragments.valueHelpDialog",
                        controller: this
                    }).then(function (oValueHelpDialog) {
                        oView.addDependent(oValueHelpDialog);
                        return oValueHelpDialog;
                    });
                }
                this._pValueHelpDialog.then(function (oValueHelpDialog) {
                    if (sKey === 'VendorCode') {
                        var oTemplate = new sap.m.StandardListItem({
                            title: "{Supplier}",
                            description: "{SupplierFullName}",
                            type: "Active"
                        });
                        oValueHelpDialog.bindAggregation("items", {
                            path: '/SUPPLIER',
                            template: oTemplate
                        });
                        oValueHelpDialog.setTitle("Select Vendor Code");
                    }
                    if (sKey === 'MaterialCode') {
                        var oTemplate = new sap.m.StandardListItem({
                            title: "{Product}",
                            description: "{DESCRIPTION}",
                            type: "Active"
                        });
                        oValueHelpDialog.bindAggregation("items", {
                            path: '/MATERIAL',
                            template: oTemplate
                        });
                        oValueHelpDialog.setTitle("Select Material Code");
                    }
                    oValueHelpDialog.open();
                }.bind(this));

            },
            onValueHelpDialogClose: function (oEvent) {
                var oSelectedItem = oEvent.getParameter("selectedItem");
                var sPath = oEvent.getParameter("selectedContexts")[0].getPath();
                var oObject = oEvent.getParameter("selectedContexts")[0].getObject();
                if (!oSelectedItem) {
                    this.oSource.resetProperty("value");
                    return;
                }
                if (this.sKey === 'VendorCode') {
                    this.getView().getModel('oTableDataModel').getProperty(this.sPath).VendorCode = oObject.Supplier;
                    this.getView().getModel('oTableDataModel').getProperty(this.sPath).VendorName = oObject.SupplierFullName;
                    this.getView().getModel('oTableDataModel').setProperty(this.sPath, this.getView().getModel('oTableDataModel').getProperty(this.sPath));
                }
                if (this.sKey === 'MaterialCode') {
                    this.getView().getModel('oTableDataModel').getProperty(this.sPath).MaterialCode = oObject.Product;
                    this.getView().getModel('oTableDataModel').getProperty(this.sPath).MaterialDescription = oObject.DESCRIPTION;
                    this.getView().getModel('oTableDataModel').setProperty(this.sPath, this.getView().getModel('oTableDataModel').getProperty(this.sPath));
                }

                // this.oSource.setValue(oSelectedItem.getDescription());
            },
            onSearch_ValueHelpDialog: function (oEvent) {
                var sValue = oEvent.getParameter("value");
                if (this.sKey === 'VendorCode') {
                    var oFilter = new Filter([
                        new Filter("Supplier", FilterOperator.Contains, sValue),
                        new Filter("SupplierFullName", FilterOperator.Contains, sValue),
                    ])
                    var oBinding = oEvent.getParameter("itemsBinding");
                    oBinding.filter([oFilter]);
                } else if (this.sKey === 'MaterialCode') {
                    var oFilter = new Filter([
                        new Filter("Product", FilterOperator.Contains, sValue),
                        new Filter("DESCRIPTION", FilterOperator.Contains, sValue),
                    ])
                    var oBinding = oEvent.getParameter("itemsBinding");
                    oBinding.filter([oFilter]);
                }
            },

        });
    });
