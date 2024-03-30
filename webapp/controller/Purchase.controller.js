sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    'sap/m/MessageToast',
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, UIComponent, MessageToast, MessageBox) {
        "use strict";
        var checkButtonPress = false;
        var GrossWaightValidacPurchaseType = false;
        var PurchaseType_RaworStore = "";
        return Controller.extend("zgateentry.controller.Purchase", {
            onInit: function () {
                this.getView().setModel(new sap.ui.model.json.JSONModel, "oTableDataModel");
                this.getView().setModel(new sap.ui.model.json.JSONModel({ "aSupplierData": "" }), "oSupplierDataModel");
                this.getView().getModel("oSupplierDataModel").setProperty("/aSupplierData", "")
                UIComponent.getRouterFor(this).getRoute('Purchase').attachPatternMatched(this.ScreenRefrash, this);
                UIComponent.getRouterFor(this).getRoute('Purchase').attachPatternMatched(this.CallGateEntryData, this);


            },
            ScreenRefrash: function () {
                var oTableModel = this.getView().getModel("oTableDataModel");
                oTableModel.setProperty("/aTableData", []);
                this.getView().byId("GateEntryNumber").setValue()
                this.getView().byId("GateEntryType").setValue()
                this.getView().byId("Plant").setValue()
                this.getView().byId("ReportingDate").setValue()
                this.getView().byId("ReportingTime").setValue()
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
                this.getView().byId("DriverName").setValue()
                this.getView().byId("DriverMobileNo").setValue()
                this.getView().byId("DriverLicenseNo").setValue()
                this.getView().byId("ReverseHorn").setSelectedIndex(-1)
                this.getView().byId("FireSafety").setSelectedIndex(-1)
                this.getView().byId("FlammableSubstance").setSelectedIndex(-1)
                this.getView().byId("DriverAlcoholic").setSelectedIndex(-1)

                this.getView().byId("VehicleFitnessCertificate").setValue()
                this.getView().byId("VehicleRCDate").setValue()
                this.getView().byId("VehicleInsurance").setValue()
                this.getView().byId("VehiclePUCNo").setValue();
                this.getView().byId("DriverLicenseExpiryDate").setValue();
                this.getView().byId("GateOutDate").setValue()
                this.getView().byId("GateOutTime").setValue()
                this.getView().byId("PoNumber").setValue()
                this.getView().byId("GrossWeight").setValue()
                this.getView().byId("TareWeight").setValue()
                this.getView().byId("NetWaight").setValue()

                //Only on Purchase
                this.getView().byId("PurchaseGroup").setValue()
                this.getView().byId("InvoiceDate").setValue()
                this.getView().byId("InvoiceNo").setValue()
                this.getView().byId("PoNumber").setValue()


            },
            CallGateEntryData: function () {
                var GateEntryAction = this.getView().getModel("oFirstScrennDataModel").getProperty("/GateEntryAction")
                if (GateEntryAction === "Create") { this.disableFieldsEditable(); this.callGateEntryDataforCreate() }
                else if (GateEntryAction === "Change") { this.disableFieldsEditable(); this.callGateEntryDataforChange() }
                else if (GateEntryAction === "Display") { this.disableFieldsEditable(); this.callGateEntryDataforDisplay() }
                else if (GateEntryAction === "Gate Out") { this.disableFieldsEditable(); this.callGateEntryDataforGateOut() }
            },
            callGateEntryDataforCreate: function () {
                this.getView().byId("GateEntryNumber").setEditable(false)
                this.getView().byId("GateEntryType").setEditable(false)
                this.getView().byId("Plant").setEditable(false)
                // this.getView().byId("GateInDate").setEditable(false)
                // this.getView().byId("GateInTime").setEditable(false)
                this.getView().byId("GateInDate").setVisible(true)
                this.getView().byId("GateInTime").setVisible(true)
                this.getView().byId("GateOutDate").setVisible(true)
                this.getView().byId("GateOutTime").setVisible(true)
                this.getView().byId("GateOutDate").setEditable(false)
                this.getView().byId("GateOutTime").setEditable(false)


                var Plant = this.getView().getModel("oFirstScrennDataModel").getProperty("/Plant")
                var GateType = this.getView().getModel("oFirstScrennDataModel").getProperty("/GateType")
                this.getView().byId("GateEntryType").setValue(GateType)
                this.getView().byId("Plant").setValue(Plant)
                this.getView().byId("ModeofTransport").setValue("Road")
                var currentDate = new Date()
                var currentDate1 = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1).toString().padStart(2, "0") + "-" + (currentDate.getDate()).toString().padStart(2, "0");
                this.getView().byId("ReportingDate").setValue(currentDate1)
                this.getView().byId("GateInDate").setValue(currentDate1)
                this.getView().byId("LRDate").setValue(currentDate1)
                this.getView().byId("InvoiceDate").setValue(currentDate1)
                const currentTime = currentDate.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false });
                this.getView().byId("GateInTime").setValue(currentTime)
                this.getView().byId("ReportingTime").setValue(currentTime)

            },
            callGateEntryDataforChange: function () {
                var oBusy = new sap.m.BusyDialog({
                    text: "Please Wait"
                });
                oBusy.open();
                this.getView().byId("GateEntryNumber").setEditable(false)
                this.getView().byId("GateEntryType").setEditable(false)
                this.getView().byId("Plant").setEditable(false)
                this.getView().byId("GateInDate").setEditable(true)
                this.getView().byId("GateInTime").setEditable(true)


                this.getView().byId("GateOutDate").setVisible(true)
                this.getView().byId("GateOutDate").setEditable(true)
                this.getView().byId("GateOutTime").setVisible(true)
                this.getView().byId("GateOutTime").setEditable(true)


                var currentDate = new Date()
                var currentDate1 = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1).toString().padStart(2, "0") + "-" + (currentDate.getDate()).toString().padStart(2, "0");
                this.getView().byId("GateOutDate").setValue(currentDate1)
                this.getView().byId("GateInDate").setValue(currentDate1)
                const currentTime = currentDate.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false });
                this.getView().byId("GateInTime").setValue(currentTime)
                this.getView().byId("GateOutTime").setValue(currentTime)
                var aTableArr = [];
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
                            var timeD = ores.results[0].Entrytime.ms;
                            var seconds = Math.floor((timeD / 1000) % 60);
                            var minutes = Math.floor(((timeD / (1000 * 60)) % 60));
                            var hours = Math.floor(((timeD / (1000 * 60 * 60)) % 24));
                            const time = hours + ":" + minutes + ":" + seconds
                            this.getView().byId("ReportingTime").setValue(time)
                            this.getView().byId("VehicleNo").setValue(ores.results[0].VehicalNo)
                            this.getView().byId("ChallanQty").setValue(ores.results[0].Challan)

                            this.getView().byId("PurchaseGroup").setValue(ores.results[0].Puchgrp)
                            if (ores.results[0].Invdt == "" || ores.results[0].Invdt == "0.00") {
                                this.getView().byId("InvoiceDate").setValue()
                            } else {
                                const InvoiceDate = new Date(ores.results[0].Invdt);
                                const InvoiceDate1 = `${InvoiceDate.getFullYear()}-${InvoiceDate.getMonth() + 1 < 10 ? '0' : ''}${InvoiceDate.getMonth() + 1}-${InvoiceDate.getDate() < 10 ? '0' : ''}${InvoiceDate.getDate()}`;
                                this.getView().byId("InvoiceDate").setValue(InvoiceDate1)
                            }
                            this.getView().byId("InvoiceNo").setValue(ores.results[0].Invoice)
                            // this.getView().byId("PoNumber").setValue(ores.results[0].)

                            this.getView().byId("OperatorName").setValue(ores.results[0].Operator)
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
                            this.getView().byId("DriverName").setValue(ores.results[0].Driver)
                            this.getView().byId("DriverMobileNo").setValue(ores.results[0].Driverno)
                            this.getView().byId("DriverLicenseNo").setValue(ores.results[0].DrLisc)
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
                            if (ores.results[0].Vehiclercdate == "" || ores.results[0].Vehiclercdate == "0.00" || ores.results[0].Vehiclercdate == null) {
                                this.getView().byId("VehicleRCDate").setValue()
                            } else {
                                const VehicleRCDate = new Date(ores.results[0].Vehiclercdate);
                                const VehicleRCDate1 = `${VehicleRCDate.getFullYear()}-${VehicleRCDate.getMonth() + 1 < 10 ? '0' : ''}${VehicleRCDate.getMonth() + 1}-${VehicleRCDate.getDate() < 10 ? '0' : ''}${VehicleRCDate.getDate()}`;
                                this.getView().byId("VehicleRCDate").setValue(VehicleRCDate1)
                            }
                            if (ores.results[0].Vehiclefitness == "" || ores.results[0].Vehiclefitness == "0.00") {
                                this.getView().byId("VehicleFitnessCertificate").setValue()
                            } else {
                                const VehicleFitnessCertificate = new Date(ores.results[0].Vehiclefitness);
                                const VehicleFitnessCertificate1 = `${VehicleFitnessCertificate.getFullYear()}-${VehicleFitnessCertificate.getMonth() + 1 < 10 ? '0' : ''}${VehicleFitnessCertificate.getMonth() + 1}-${VehicleFitnessCertificate.getDate() < 10 ? '0' : ''}${VehicleFitnessCertificate.getDate()}`;
                                this.getView().byId("VehicleFitnessCertificate").setValue(VehicleFitnessCertificate1)
                            }
                            this.getView().byId("VehicleInsurance").setValue(ores.results[0].Vehicleinsurance)
                            if (ores.results[0].Vehicleinsurance == "" || ores.results[0].Vehicleinsurance == "0.00") {
                                this.getView().byId("VehicleInsurance").setValue()
                            } else {
                                const VehicleInsurance = new Date(ores.results[0].Vehicleinsurance);
                                const VehicleInsurance1 = `${VehicleInsurance.getFullYear()}-${VehicleInsurance.getMonth() + 1 < 10 ? '0' : ''}${VehicleInsurance.getMonth() + 1}-${VehicleInsurance.getDate() < 10 ? '0' : ''}${VehicleInsurance.getDate()}`;
                                this.getView().byId("VehicleInsurance").setValue(VehicleInsurance1)
                            }
                            this.getView().byId("VehiclePUCNo").setValue(ores.results[0].Vehiclepuc);
                            if (ores.results[0].Driverlicense == "" || ores.results[0].Driverlicense == "0.00") {
                                this.getView().byId("DriverLicenseExpiryDate").setValue()
                            } else {
                                const DriverLicenseExpiryDate = new Date(ores.results[0].Driverlicense);
                                const DriverLicenseExpiryDate1 = `${DriverLicenseExpiryDate.getFullYear()}-${DriverLicenseExpiryDate.getMonth() + 1 < 10 ? '0' : ''}${DriverLicenseExpiryDate.getMonth() + 1}-${DriverLicenseExpiryDate.getDate() < 10 ? '0' : ''}${DriverLicenseExpiryDate.getDate()}`;
                                this.getView().byId("DriverLicenseExpiryDate").setValue(DriverLicenseExpiryDate1)
                            }
                            this.getView().byId("GrossWeight").setValue(ores.results[0].GrossWt)
                            this.getView().byId("TareWeight").setValue(ores.results[0].TareWt)
                            this.getView().byId("NetWaight").setValue(ores.results[0].NetWt)

                            for (var D = 0; D < ores.results[0].to_gateitem.results.length; D++) {
                                aTableArr.push({
                                    "BackendDataAvl": true,
                                    "PoNumber": ores.results[0].to_gateitem.results[D].Ebeln,
                                    "GateItem": ores.results[0].to_gateitem.results[D].GateItem,
                                    "PoLineItem": ores.results[0].to_gateitem.results[D].Ebelp,
                                    "VenderCode": ores.results[0].to_gateitem.results[D].Lifnr,
                                    "VenderName": ores.results[0].to_gateitem.results[D].Name1,
                                    "MaterialCode": ores.results[0].to_gateitem.results[D].Matnr,
                                    "MaterialDescription": ores.results[0].to_gateitem.results[D].Maktx,
                                    "OrderQuantity": ores.results[0].to_gateitem.results[D].OrderQty,
                                    "UnitPriceinPo": ores.results[0].to_gateitem.results[D].NetPriceAmount,
                                    "GateQuantity": ores.results[0].to_gateitem.results[D].GateQty,
                                    "GateQuantity_ValueState": "None",
                                    "GateDoneQuantity": ores.results[0].to_gateitem.results[D].OpenQty,
                                    "Unit": ores.results[0].to_gateitem.results[D].Uom,
                                    "Remarks": ores.results[0].to_gateitem.results[D].Remark,
                                })
                            }
                            aTableArr.sort(function (a, b) {
                                return a.PoLineItem - b.PoLineItem;
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
                            var timeD = ores.results[0].Entrytime.ms;
                            var seconds = Math.floor((timeD / 1000) % 60);
                            var minutes = Math.floor(((timeD / (1000 * 60)) % 60));
                            var hours = Math.floor(((timeD / (1000 * 60 * 60)) % 24));
                            const time = hours + ":" + minutes + ":" + seconds
                            this.getView().byId("ReportingTime").setValue(time)


                            if (ores.results[0].GateInDt == "" || ores.results[0].GateInDt == "0.00") {
                                this.getView().byId("GateInDate").setValue()
                            } else {
                                const GateInDate = new Date(ores.results[0].GateInDt);
                                const GateInDate1 = `${GateInDate.getFullYear()}-${GateInDate.getMonth() + 1 < 10 ? '0' : ''}${GateInDate.getMonth() + 1}-${GateInDate.getDate() < 10 ? '0' : ''}${GateInDate.getDate()}`;
                                this.getView().byId("GateInDate").setValue(GateInDate1)
                            }
                            var GateInTime = ores.results[0].GateInTm.ms;
                            var GateInTime_seconds = Math.floor((GateInTime / 1000) % 60);
                            var GateInTime_minutes = Math.floor(((GateInTime / (1000 * 60)) % 60));
                            var GateInTime_hours = Math.floor(((GateInTime / (1000 * 60 * 60)) % 24));
                            const GateInTime1 = GateInTime_hours + ":" + GateInTime_minutes + ":" + GateInTime_seconds
                            this.getView().byId("GateInTime").setValue(GateInTime1)

                            if (ores.results[0].GateOutDt == "" || ores.results[0].GateOutDt == "0.00") {
                                this.getView().byId("GateOutDate").setValue()
                            } else {
                                const GateOutDate = new Date(ores.results[0].GateOutDt);
                                const GateOutDate1 = `${GateOutDate.getFullYear()}-${GateOutDate.getMonth() + 1 < 10 ? '0' : ''}${GateOutDate.getMonth() + 1}-${GateOutDate.getDate() < 10 ? '0' : ''}${GateOutDate.getDate()}`;
                                this.getView().byId("GateOutDate").setValue(GateOutDate1)
                            }
                            var GateOutTime = ores.results[0].GateOutTm.ms;
                            var GateOutTime_seconds = Math.floor((GateOutTime / 1000) % 60);
                            var GateOutTime_minutes = Math.floor(((GateOutTime / (1000 * 60)) % 60));
                            var GateOutTime_hours = Math.floor(((GateOutTime / (1000 * 60 * 60)) % 24));
                            const GateOutTime1 = GateOutTime_hours + ":" + GateOutTime_minutes + ":" + GateOutTime_seconds
                            this.getView().byId("GateOutTime").setValue(GateOutTime1)

                            this.getView().byId("VehicleNo").setValue(ores.results[0].VehicalNo)
                            this.getView().byId("ChallanQty").setValue(ores.results[0].Challan)

                            this.getView().byId("PurchaseGroup").setValue(ores.results[0].Puchgrp)
                            if (ores.results[0].Invdt == "" || ores.results[0].Invdt == "0.00") {
                                this.getView().byId("InvoiceDate").setValue()
                            } else {
                                const InvoiceDate = new Date(ores.results[0].Invdt);
                                const InvoiceDate1 = `${InvoiceDate.getFullYear()}-${InvoiceDate.getMonth() + 1 < 10 ? '0' : ''}${InvoiceDate.getMonth() + 1}-${InvoiceDate.getDate() < 10 ? '0' : ''}${InvoiceDate.getDate()}`;
                                this.getView().byId("InvoiceDate").setValue(InvoiceDate1)
                            }
                            this.getView().byId("InvoiceNo").setValue(ores.results[0].Invoice)
                            // this.getView().byId("PoNumber").setValue(ores.results[0].)

                            this.getView().byId("OperatorName").setValue(ores.results[0].Operator)
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
                            this.getView().byId("DriverName").setValue(ores.results[0].Driver)
                            this.getView().byId("DriverMobileNo").setValue(ores.results[0].Driverno)
                            this.getView().byId("DriverLicenseNo").setValue(ores.results[0].DrLisc)
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
                            if (ores.results[0].Vehiclercdate == "" || ores.results[0].Vehiclercdate == "0.00" || ores.results[0].Vehiclercdate == null) {
                                this.getView().byId("VehicleRCDate").setValue()
                            } else {
                                const VehicleRCDate = new Date(ores.results[0].Vehiclercdate);
                                const VehicleRCDate1 = `${VehicleRCDate.getFullYear()}-${VehicleRCDate.getMonth() + 1 < 10 ? '0' : ''}${VehicleRCDate.getMonth() + 1}-${VehicleRCDate.getDate() < 10 ? '0' : ''}${VehicleRCDate.getDate()}`;
                                this.getView().byId("VehicleRCDate").setValue(VehicleRCDate1)
                            }
                            if (ores.results[0].Vehiclefitness == "" || ores.results[0].Vehiclefitness == "0.00") {
                                this.getView().byId("VehicleFitnessCertificate").setValue()
                            } else {
                                const VehicleFitnessCertificate = new Date(ores.results[0].Vehiclefitness);
                                const VehicleFitnessCertificate1 = `${VehicleFitnessCertificate.getFullYear()}-${VehicleFitnessCertificate.getMonth() + 1 < 10 ? '0' : ''}${VehicleFitnessCertificate.getMonth() + 1}-${VehicleFitnessCertificate.getDate() < 10 ? '0' : ''}${VehicleFitnessCertificate.getDate()}`;
                                this.getView().byId("VehicleFitnessCertificate").setValue(VehicleFitnessCertificate1)
                            }
                            this.getView().byId("VehicleInsurance").setValue(ores.results[0].Vehicleinsurance)
                            if (ores.results[0].Vehicleinsurance == "" || ores.results[0].Vehicleinsurance == "0.00") {
                                this.getView().byId("VehicleInsurance").setValue()
                            } else {
                                const VehicleInsurance = new Date(ores.results[0].Vehicleinsurance);
                                const VehicleInsurance1 = `${VehicleInsurance.getFullYear()}-${VehicleInsurance.getMonth() + 1 < 10 ? '0' : ''}${VehicleInsurance.getMonth() + 1}-${VehicleInsurance.getDate() < 10 ? '0' : ''}${VehicleInsurance.getDate()}`;
                                this.getView().byId("VehicleInsurance").setValue(VehicleInsurance1)
                            }
                            this.getView().byId("VehiclePUCNo").setValue(ores.results[0].Vehiclepuc);
                            if (ores.results[0].Driverlicense == "" || ores.results[0].Driverlicense == "0.00") {
                                this.getView().byId("DriverLicenseExpiryDate").setValue()
                            } else {
                                const DriverLicenseExpiryDate = new Date(ores.results[0].Driverlicense);
                                const DriverLicenseExpiryDate1 = `${DriverLicenseExpiryDate.getFullYear()}-${DriverLicenseExpiryDate.getMonth() + 1 < 10 ? '0' : ''}${DriverLicenseExpiryDate.getMonth() + 1}-${DriverLicenseExpiryDate.getDate() < 10 ? '0' : ''}${DriverLicenseExpiryDate.getDate()}`;
                                this.getView().byId("DriverLicenseExpiryDate").setValue(DriverLicenseExpiryDate1)
                            }
                            this.getView().byId("GrossWeight").setValue(ores.results[0].GrossWt)
                            this.getView().byId("TareWeight").setValue(ores.results[0].TareWt)
                            this.getView().byId("NetWaight").setValue(ores.results[0].NetWt)

                            for (var D = 0; D < ores.results[0].to_gateitem.results.length; D++) {
                                aTableArr.push({
                                    "BackendDataAvl": true,
                                    "PoNumber": ores.results[0].to_gateitem.results[D].Ebeln,
                                    "GateItem": ores.results[0].to_gateitem.results[D].GateItem,
                                    "PoLineItem": ores.results[0].to_gateitem.results[D].Ebelp,
                                    "VenderCode": ores.results[0].to_gateitem.results[D].Lifnr,
                                    "VenderName": ores.results[0].to_gateitem.results[D].Name1,
                                    "MaterialCode": ores.results[0].to_gateitem.results[D].Matnr,
                                    "MaterialDescription": ores.results[0].to_gateitem.results[D].Maktx,
                                    "OrderQuantity": ores.results[0].to_gateitem.results[D].OrderQty,
                                    "UnitPriceinPo": ores.results[0].to_gateitem.results[D].NetPriceAmount,
                                    "GateQuantity_ValueState": "None",
                                    "GateQuantity": ores.results[0].to_gateitem.results[D].GateQty,
                                    "GateDoneQuantity": ores.results[0].to_gateitem.results[D].OpenQty,
                                    "Unit": ores.results[0].to_gateitem.results[D].Uom,
                                    "Remarks": ores.results[0].to_gateitem.results[D].Remark,
                                })
                            }
                            aTableArr.sort(function (a, b) {
                                return a.PoLineItem - b.PoLineItem;
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
                this.getView().byId("GateEntryNumber").setEditable(false)
                this.getView().byId("GateEntryType").setEditable(false)
                this.getView().byId("Plant").setEditable(false)
                this.getView().byId("GateInDate").setEditable(false)
                this.getView().byId("GateInTime").setEditable(false)
                this.getView().byId("ReportingDate").setEditable(false)
                this.getView().byId("ReportingTime").setEditable(false)
                this.getView().byId("InvoiceDate").setEditable(false)
                this.getView().byId("GateOutDate").setVisible(true)
                this.getView().byId("GateOutTime").setVisible(true)
                this.getView().byId("GateOutDate").setEditable(true)
                this.getView().byId("GateOutTime").setEditable(true)
                var currentDate = new Date()
                var currentDate1 = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1).toString().padStart(2, "0") + "-" + (currentDate.getDate()).toString().padStart(2, "0");
                this.getView().byId("GateOutDate").setValue(currentDate1)
                this.getView().byId("GateInDate").setValue(currentDate1)
                const currentTime = currentDate.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false });
                this.getView().byId("GateInTime").setValue(currentTime)
                this.getView().byId("GateOutTime").setValue(currentTime)
                var aTableArr = [];
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
                            var timeD = ores.results[0].Entrytime.ms;
                            var seconds = Math.floor((timeD / 1000) % 60);
                            var minutes = Math.floor(((timeD / (1000 * 60)) % 60));
                            var hours = Math.floor(((timeD / (1000 * 60 * 60)) % 24));
                            const time = hours + ":" + minutes + ":" + seconds
                            this.getView().byId("ReportingTime").setValue(time)
                            this.getView().byId("VehicleNo").setValue(ores.results[0].VehicalNo)
                            this.getView().byId("ChallanQty").setValue(ores.results[0].Challan)

                            this.getView().byId("PurchaseGroup").setValue(ores.results[0].Puchgrp)
                            if (ores.results[0].Invdt == "" || ores.results[0].Invdt == "0.00") {
                                this.getView().byId("InvoiceDate").setValue()
                            } else {
                                const InvoiceDate = new Date(ores.results[0].Invdt);
                                const InvoiceDate1 = `${InvoiceDate.getFullYear()}-${InvoiceDate.getMonth() + 1 < 10 ? '0' : ''}${InvoiceDate.getMonth() + 1}-${InvoiceDate.getDate() < 10 ? '0' : ''}${InvoiceDate.getDate()}`;
                                this.getView().byId("InvoiceDate").setValue(InvoiceDate1)
                            }
                            this.getView().byId("InvoiceNo").setValue(ores.results[0].Invoice)
                            // this.getView().byId("PoNumber").setValue(ores.results[0].)

                            this.getView().byId("OperatorName").setValue(ores.results[0].Operator)
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
                            this.getView().byId("DriverName").setValue(ores.results[0].Driver)
                            this.getView().byId("DriverMobileNo").setValue(ores.results[0].Driverno)
                            this.getView().byId("DriverLicenseNo").setValue(ores.results[0].DrLisc)
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
                            if (ores.results[0].Vehiclercdate == "" || ores.results[0].Vehiclercdate == "0.00" || ores.results[0].Vehiclercdate == null) {
                                this.getView().byId("VehicleRCDate").setValue()
                            } else {
                                const VehicleRCDate = new Date(ores.results[0].Vehiclercdate);
                                const VehicleRCDate1 = `${VehicleRCDate.getFullYear()}-${VehicleRCDate.getMonth() + 1 < 10 ? '0' : ''}${VehicleRCDate.getMonth() + 1}-${VehicleRCDate.getDate() < 10 ? '0' : ''}${VehicleRCDate.getDate()}`;
                                this.getView().byId("VehicleRCDate").setValue(VehicleRCDate1)
                            }
                            if (ores.results[0].Vehiclefitness == "" || ores.results[0].Vehiclefitness == "0.00") {
                                this.getView().byId("VehicleFitnessCertificate").setValue()
                            } else {
                                const VehicleFitnessCertificate = new Date(ores.results[0].Vehiclefitness);
                                const VehicleFitnessCertificate1 = `${VehicleFitnessCertificate.getFullYear()}-${VehicleFitnessCertificate.getMonth() + 1 < 10 ? '0' : ''}${VehicleFitnessCertificate.getMonth() + 1}-${VehicleFitnessCertificate.getDate() < 10 ? '0' : ''}${VehicleFitnessCertificate.getDate()}`;
                                this.getView().byId("VehicleFitnessCertificate").setValue(VehicleFitnessCertificate1)
                            }
                            this.getView().byId("VehicleInsurance").setValue(ores.results[0].Vehicleinsurance)
                            if (ores.results[0].Vehicleinsurance == "" || ores.results[0].Vehicleinsurance == "0.00") {
                                this.getView().byId("VehicleInsurance").setValue()
                            } else {
                                const VehicleInsurance = new Date(ores.results[0].Vehicleinsurance);
                                const VehicleInsurance1 = `${VehicleInsurance.getFullYear()}-${VehicleInsurance.getMonth() + 1 < 10 ? '0' : ''}${VehicleInsurance.getMonth() + 1}-${VehicleInsurance.getDate() < 10 ? '0' : ''}${VehicleInsurance.getDate()}`;
                                this.getView().byId("VehicleInsurance").setValue(VehicleInsurance1)
                            }
                            this.getView().byId("VehiclePUCNo").setValue(ores.results[0].Vehiclepuc);
                            if (ores.results[0].Driverlicense == "" || ores.results[0].Driverlicense == "0.00") {
                                this.getView().byId("DriverLicenseExpiryDate").setValue()
                            } else {
                                const DriverLicenseExpiryDate = new Date(ores.results[0].Driverlicense);
                                const DriverLicenseExpiryDate1 = `${DriverLicenseExpiryDate.getFullYear()}-${DriverLicenseExpiryDate.getMonth() + 1 < 10 ? '0' : ''}${DriverLicenseExpiryDate.getMonth() + 1}-${DriverLicenseExpiryDate.getDate() < 10 ? '0' : ''}${DriverLicenseExpiryDate.getDate()}`;
                                this.getView().byId("DriverLicenseExpiryDate").setValue(DriverLicenseExpiryDate1)
                            }
                            this.getView().byId("GrossWeight").setValue(ores.results[0].GrossWt)
                            this.getView().byId("TareWeight").setValue(ores.results[0].TareWt)
                            this.getView().byId("NetWaight").setValue(ores.results[0].NetWt)

                            for (var D = 0; D < ores.results[0].to_gateitem.results.length; D++) {
                                aTableArr.push({
                                    "BackendDataAvl": true,
                                    "PoNumber": ores.results[0].to_gateitem.results[D].Ebeln,
                                    "GateItem": ores.results[0].to_gateitem.results[D].GateItem,
                                    "PoLineItem": ores.results[0].to_gateitem.results[D].Ebelp,
                                    "VenderCode": ores.results[0].to_gateitem.results[D].Lifnr,
                                    "VenderName": ores.results[0].to_gateitem.results[D].Name1,
                                    "MaterialCode": ores.results[0].to_gateitem.results[D].Matnr,
                                    "MaterialDescription": ores.results[0].to_gateitem.results[D].Maktx,
                                    "OrderQuantity": ores.results[0].to_gateitem.results[D].OrderQty,
                                    "UnitPriceinPo": ores.results[0].to_gateitem.results[D].NetPriceAmount,
                                    "GateQuantity_ValueState": "None",
                                    "GateQuantity": ores.results[0].to_gateitem.results[D].GateQty,
                                    "GateDoneQuantity": ores.results[0].to_gateitem.results[D].OpenQty,
                                    "Unit": ores.results[0].to_gateitem.results[D].Uom,
                                    "Remarks": ores.results[0].to_gateitem.results[D].Remark,
                                })
                            }
                            aTableArr.sort(function (a, b) {
                                return a.PoLineItem - b.PoLineItem;
                            });
                            oTableModel.setProperty("/aTableData", aTableArr);
                            oBusy.close();
                        }
                    }.bind(this)
                })
            },
            disableFieldsEditable: function () {
                var GateEntryAction = this.getView().getModel("oFirstScrennDataModel").getProperty("/GateEntryAction")
                if (GateEntryAction === "Display") {
                    this.getView().byId("GateEntryNumber").setEditable(false);
                    this.getView().byId("GateEntryType").setEditable(false);
                    this.getView().byId("Plant").setEditable(false);
                    this.getView().byId("ReportingDate").setEditable(false);
                    this.getView().byId("ReportingTime").setEditable(false);
                    this.getView().byId("VehicleNo").setEditable(false);
                    this.getView().byId("ChallanQty").setEditable(false);

                    this.getView().byId("PurchaseGroup").setEditable(false)
                    this.getView().byId("InvoiceDate").setEditable(false)
                    this.getView().byId("InvoiceNo").setEditable(false)
                    this.getView().byId("PoNumber").setEditable(false)

                    this.getView().byId("OperatorName").setEditable(false);
                    this.getView().byId("GateInDate").setEditable(false);
                    this.getView().byId("GateInTime").setEditable(false);
                    this.getView().byId("LRDate").setEditable(false);
                    this.getView().byId("LRNumber").setEditable(false);
                    this.getView().byId("Remark").setEditable(false);
                    this.getView().byId("ModeofTransport").setEditable(false);
                    this.getView().byId("TransporterName").setEditable(false);
                    this.getView().byId("DriverName").setEditable(false);
                    this.getView().byId("DriverMobileNo").setEditable(false);
                    this.getView().byId("DriverLicenseNo").setEditable(false);
                    this.getView().byId("ReverseHorn").setEditable(false);
                    this.getView().byId("FireSafety").setEditable(false);
                    this.getView().byId("FlammableSubstance").setEditable(false);
                    this.getView().byId("DriverAlcoholic").setEditable(false);
                    this.getView().byId("VehicleFitnessCertificate").setEditable(false);
                    this.getView().byId("VehicleRCDate").setEditable(false);
                    this.getView().byId("VehiclePUCNo").setEditable(false);
                    this.getView().byId("DriverLicenseExpiryDate").setEditable(false);
                    this.getView().byId("VehicleInsurance").setEditable(false);
                    this.getView().byId("VehiclePUCNo").setEditable(false);
                    this.getView().byId("DriverLicenseExpiryDate").setEditable(false);
                    this.getView().byId("GateOutDate").setEditable(false);
                    this.getView().byId("GateOutTime").setEditable(false);
                    this.getView().byId("PoNumber").setEditable(false);
                    this.getView().byId("GrossWeight").setEditable(false);
                    this.getView().byId("TareWeight").setEditable(false);
                    this.getView().byId("NetWaight").setEditable(false)

                    this.getView().byId("GetTableData").setVisible(false)
                    // this.getView().byId("Table_AddButton").setVisible(false)
                    this.getView().byId("Table_DeleteButton").setVisible(false)
                    this.getView().byId("CheckInvoiceNumberButton").setEnabled(false)
                    this.getView().byId("Table_SaveButton").setVisible(false)
                } else {
                    this.getView().byId("GateEntryNumber").setEditable(true);
                    this.getView().byId("GateEntryType").setEditable(true);
                    this.getView().byId("Plant").setEditable(true);
                    this.getView().byId("ReportingDate").setEditable(true);
                    this.getView().byId("ReportingTime").setEditable(true);
                    this.getView().byId("VehicleNo").setEditable(true);

                    this.getView().byId("PurchaseGroup").setEditable(true)
                    this.getView().byId("InvoiceDate").setEditable(true)
                    if (GateEntryAction === "Create") {
                        this.getView().byId("InvoiceNo").setEditable(false)
                        this.getView().byId("CheckInvoiceNumberButton").setEnabled(false)
                    } else {
                        this.getView().byId("InvoiceNo").setEditable(true)
                        this.getView().byId("CheckInvoiceNumberButton").setEnabled(true)
                    }
                    this.getView().byId("PoNumber").setEditable(true)
                    this.getView().byId("ChallanQty").setEditable(true);
                    this.getView().byId("OperatorName").setEditable(true);
                    this.getView().byId("GateInDate").setEditable(true);
                    this.getView().byId("GateInTime").setEditable(true);
                    this.getView().byId("LRDate").setEditable(true);
                    this.getView().byId("LRNumber").setEditable(true);
                    this.getView().byId("Remark").setEditable(true);
                    this.getView().byId("ModeofTransport").setEditable(true);
                    this.getView().byId("TransporterName").setEditable(true);
                    this.getView().byId("DriverName").setEditable(true);
                    this.getView().byId("DriverMobileNo").setEditable(true);
                    this.getView().byId("DriverLicenseNo").setEditable(true);
                    this.getView().byId("ReverseHorn").setEditable(true);
                    this.getView().byId("FireSafety").setEditable(true);
                    this.getView().byId("FlammableSubstance").setEditable(true);
                    this.getView().byId("DriverAlcoholic").setEditable(true);
                    this.getView().byId("VehicleFitnessCertificate").setEditable(true);
                    this.getView().byId("VehicleRCDate").setEditable(true);
                    this.getView().byId("VehicleInsurance").setEditable(true);
                    this.getView().byId("VehiclePUCNo").setEditable(true);
                    this.getView().byId("DriverLicenseExpiryDate").setEditable(true);
                    this.getView().byId("GateOutDate").setEditable(true);
                    this.getView().byId("GateOutTime").setEditable(true);
                    this.getView().byId("PoNumber").setEditable(true);
                    this.getView().byId("GrossWeight").setEditable(true);
                    this.getView().byId("TareWeight").setEditable(true);
                    this.getView().byId("NetWaight").setEditable(false);

                    this.getView().byId("GetTableData").setVisible(true)
                    // this.getView().byId("Table_AddButton").setVisible(true)
                    this.getView().byId("Table_DeleteButton").setVisible(false)
                    this.getView().byId("Table_SaveButton").setVisible(true)
                }


            },
            GetTableData: function () {
                var that = this;
                var PoNumber = this.getView().byId("PoNumber").getValue();
                var InvoiceNo_Label = this.getView().byId("InvoiceNo_Label")
                var InvoiceNo = this.getView().byId("InvoiceNo")
                var CheckInvoiceNumberButton = this.getView().byId("CheckInvoiceNumberButton")
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
                    var oFilter1 = new sap.ui.model.Filter("PurchaseOrder", "EQ", PoNumber);
                    var oFilter2 = new sap.ui.model.Filter("DOCUMENT", "EQ", "PO");
                    var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Y1416_GATE");
                    var oTableModel = this.getView().getModel("oTableDataModel");
                    var aTableArr = oTableModel.getProperty("/aTableData");
                    var poAvl = false;
                    for (var D = 0; D < aTableArr.length; D++) {
                        if (aTableArr[D].PoNumber == PoNumber) {
                            poAvl = true;
                            break;
                        }
                    }
                    if (poAvl == false) {
                        oModel.read("/purchase_ordentity", {
                            filters: [oFilter1, oFilter2],
                            urlParameters: {
                                "$top": "5000"
                            },
                            success: function (oresponse) {
                                if (oresponse.results.length != 0) {
                                    var plantAvailable = [];
                                    var wrongPlantAvailable = [];
                                    var poReliseError = [];
                                    oresponse.results.map(function (items) {
                                        if (items.Plant === Plant) {
                                            plantAvailable.push("Plant Present");
                                        } else {
                                            wrongPlantAvailable.push(items.Plant);
                                        }
                                    })
                                    for (var D = 0; D < oresponse.results.length; D++) {
                                        if (oresponse.results[D].ReleaseIsNot == true || oresponse.results[D].ReleaseIsNot == "X") {
                                            poReliseError.push("Po Reliese");
                                            break;
                                        }
                                    }
                                    if (poReliseError.length != 0) {
                                        MessageBox.error("first release the Purchase Order Number")
                                        oBusy.close();
                                    } else {
                                        if (plantAvailable.length != 0) {
                                            that.getView().getModel("oSupplierDataModel").setProperty("/aSupplierData", oresponse.results[0].suppliernumber)
                                            if (aTableArr.length === 0) {
                                                oresponse.results.map(function (items) {
                                                    var value = items.PurchasingGroup;
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
                                                    if (items.PurchaseOrderType == "ZRWD" || items.PurchaseOrderType == "ZRAI" || items.PurchaseOrderType == "ZRAR") {
                                                        GrossWaightValidacPurchaseType = true;
                                                    } else {
                                                        GrossWaightValidacPurchaseType = false;
                                                    }
                                                    if (items.PurchaseOrderType == "ZCAD" || items.PurchaseOrderType == "ZCAI" || items.PurchaseOrderType == "ZSTD" || items.PurchaseOrderType == "ZSTI" || items.PurchaseOrderType == "ZSER" || items.PurchaseOrderType == "ZPRJ" || items.PurchaseOrderType == "ZPRI") {
                                                        PurchaseType_RaworStore = "Store";
                                                    } else if (items.PurchaseOrderType == "ZRWD" || items.PurchaseOrderType == "ZRAI" || items.PurchaseOrderType == "ZYAP") {
                                                        PurchaseType_RaworStore = "Raw";
                                                    }


                                                    var obj = {
                                                        "BackendDataAvl": false,
                                                        "PoNumber": items.PurchaseOrder,
                                                        "PoLineItem": items.PurchaseOrderItem,
                                                        "GateItem": items.PurchaseOrderItem,
                                                        "VenderCode": items.suppliernumber,
                                                        "VenderName": items.SupplierName,
                                                        "MaterialCode": items.Material,
                                                        "MaterialDescription": items.ProductName,
                                                        "tolerancequantity": items.tolerancequantity,
                                                        "TolerancePercentage": items.TolerancePercentage,
                                                        "OrderQuantity": num2,
                                                        "UnitPriceinPo": items.NetPriceAmount,
                                                        "GateQuantity": null,
                                                        "GateQuantity_ValueState": "None",
                                                        "GateDoneQuantity": items.totalgatequantity,
                                                        "Unit": items.PurchaseOrderQuantityUnit === "TO" ? "MT" : items.PurchaseOrderQuantityUnit,
                                                        "Remarks": "",
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
                                                that.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel({ aSupplierData: "" }), "");
                                                InvoiceNo.setEditable(true);
                                                CheckInvoiceNumberButton.setEnabled(true);
                                                oBusy.close();
                                            } else {
                                                oresponse.results.map(function (items) {
                                                    var lastGateItem = Number(aTableArr[aTableArr.length - 1].PoLineItem);
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
                                                    if (items.PurchaseOrderType == "ZRWD" || items.PurchaseOrderType == "ZRAI" || items.PurchaseOrderType == "ZRAR") {
                                                        GrossWaightValidacPurchaseType = true;
                                                    } else {
                                                        GrossWaightValidacPurchaseType = false;
                                                    }
                                                    if (items.PurchaseOrderType == "ZCAD" || items.PurchaseOrderType == "ZCAI" || items.PurchaseOrderType == "ZSTD" || items.PurchaseOrderType == "ZSTI" || items.PurchaseOrderType == "ZSER" || items.PurchaseOrderType == "ZPRJ" || items.PurchaseOrderType == "ZPRI") {
                                                        PurchaseType_RaworStore = "Store";
                                                    } else if (items.PurchaseOrderType == "ZRWD" || items.PurchaseOrderType == "ZRAI" || items.PurchaseOrderType == "ZYAP") {
                                                        PurchaseType_RaworStore = "Raw";
                                                    }
                                                    var obj = {
                                                        "BackendDataAvl": false,
                                                        "PoNumber": items.PurchaseOrder,
                                                        // "PoLineItem": (lastGateItem + 10).toString(),
                                                        // "GateItem": (lastGateItem + 10).toString(),
                                                        "VenderCode": items.suppliernumber,
                                                        "tolerancequantity": items.tolerancequantity,
                                                        "TolerancePercentage": items.TolerancePercentage,
                                                        "VenderName": items.SupplierName,
                                                        "MaterialCode": items.Material,
                                                        "MaterialDescription": items.ProductName,
                                                        "OrderQuantity": num2,
                                                        "UnitPriceinPo": items.NetPriceAmount,
                                                        "GateQuantity": null,
                                                        "GateQuantity_ValueState": "None",
                                                        "GateDoneQuantity": items.totalgatequantity,
                                                        "Unit": items.PurchaseOrderQuantityUnit === "TO" ? "MT" : items.PurchaseOrderQuantityUnit,
                                                        "Remarks": "",
                                                    }
                                                    function isObjectInArray(target, array) {
                                                        for (var i = 0; i < array.length; i++) {
                                                            var object = {
                                                                "BackendDataAvl": false,
                                                                "PoNumber": array[i].PoNumber,
                                                                "VenderCode": array[i].VenderCode,
                                                                "VenderName": array[i].VenderName,
                                                                "tolerancequantity": array[i].tolerancequantity,
                                                                "TolerancePercentage": array[i].TolerancePercentage,
                                                                "MaterialCode": array[i].MaterialCode,
                                                                "MaterialDescription": array[i].MaterialDescription,
                                                                "OrderQuantity": array[i].OrderQuantity,
                                                                "UnitPriceinPo": array[i].UnitPriceinPo,
                                                                "GateQuantity_ValueState": "None",
                                                                "GateQuantity": null,
                                                                "GateDoneQuantity": array[i].GateDoneQuantity,
                                                                "Unit": array[i].Unit,
                                                                "Remarks": array[i].Remarks,
                                                            }
                                                            if (JSON.stringify(object) == JSON.stringify(target)) {
                                                                return true;
                                                            }
                                                        }
                                                        return false;
                                                    }
                                                    var isPresent = isObjectInArray(obj, aTableArr);
                                                    if (!isPresent) {
                                                        obj["PoLineItem"] = (lastGateItem + 10).toString();
                                                        obj["GateItem"] = (lastGateItem + 10).toString();
                                                        aTableArr.push(obj)
                                                    }
                                                })
                                                oTableModel.setProperty("/aTableData", aTableArr);

                                                InvoiceNo.setEditable(true);
                                                CheckInvoiceNumberButton.setEnabled(true);
                                                oBusy.close();

                                            }
                                        } else {
                                            oBusy.close();
                                            // MessageBox.error("Please select " + wrongPlantAvailable.toString() + " Plant")
                                            MessageBox.warning("Please select " + wrongPlantAvailable.toString() + " Plant", {
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
                                        }
                                    }
                                } else {
                                    MessageBox.error("Please Select Valid Purchase order")
                                    oBusy.close();
                                }
                            }.bind(this)
                        })
                    } else {
                        MessageBox.warning("Purchase Order Already Exit")
                        this.getView().byId("PoNumber").setValueState("Warning");
                        oBusy.close();
                    }
                }


            },
            AddSingleEmptyRow: function () {
                var oTableModel = this.getView().getModel("oTableDataModel");
                var aTableArr = oTableModel.getProperty("/aTableData");
                aTableArr.push({
                    "BackendDataAvl": true,
                    "SalesDocument": "",
                    "Invoice": "",
                    "DelivaryNumber": "",
                    "Item": "",
                    "CustomerCode": "",
                    "CustomerName": "",
                    "MaterialCode": "",
                    "DelivaryQuantity": "",
                    "Package": "",
                    "MaterialDescription": "",
                    "UOM": "",
                    "Remarks": "",
                })
                oTableModel.setProperty("/aTableData", aTableArr);
            },
            DeleteTables_SelectedRow_Button_Visible: function () {
                var GateEntryAction = this.getView().getModel("oFirstScrennDataModel").getProperty("/GateEntryAction")
                if (GateEntryAction != "Display") {
                    var oTable = this.getView().byId("PurchaseGateTypeTable").getSelectedIndices();
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
                var oTable = this.getView().byId("PurchaseGateTypeTable");
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
                                    oModel.remove("/zgateitem_ent(Gateno='" + gateEntryNumber + "',GateItem='" + aTableArr[item].GateItem + "')", {
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



            SaveGateEntry: function () {
                var vehicle = this.getView().byId("VehicleNo").getValue();
                var OperatorName = this.getView().byId("OperatorName").getValue();
                var InvoiceDate = this.getView().byId("InvoiceDate").getValue();
                var InvoiceNo = this.getView().byId("InvoiceNo").getValue();
                var GrossWeight = this.getView().byId("GrossWeight").getValue();
                var DriverName = this.getView().byId("DriverName").getValue();
                var DriverMobileNo = this.getView().byId("DriverMobileNo").getValue();
                if (DriverName == "" || DriverMobileNo == "" || vehicle == "" || OperatorName == "" || InvoiceDate == "" || InvoiceNo == "" || (GrossWaightValidacPurchaseType == true && GrossWeight == "")) {
                    var error = "";
                    if (DriverName == "") { error = error + "Please Enter Driver Name First\n\n"; this.getView().byId("DriverName").setValueState("Error"); }
                    if (DriverMobileNo == "") { error = error + "Please Enter Driver Mobile Number First\n\n"; this.getView().byId("DriverMobileNo").setValueState("Error"); }
                    if (vehicle == "") { error = error + "Please Enter Vehicle Number First\n\n"; this.getView().byId("VehicleNo").setValueState("Error"); }
                    if (OperatorName == "") { error = error + "Please Enter Operator Name First\n\n"; this.getView().byId("OperatorName").setValueState("Error"); }
                    if (InvoiceDate == "") { error = error + "Please Enter Invoice Date First\n\n"; this.getView().byId("InvoiceDate").setValueState("Error"); }
                    if (InvoiceNo == "") { error = error + "Please Enter Invoice Number First\n\n"; this.getView().byId("InvoiceNo").setValueState("Error"); }
                    if (GrossWaightValidacPurchaseType == true && GrossWeight == "") { error = error + "Please Enter Gross Waight First\n\n"; this.getView().byId("GrossWeight").setValueState("Error"); }
                    MessageBox.error(error)
                } else {
                    var oTableModel = this.getView().getModel("oTableDataModel");
                    var aTableData = oTableModel.getProperty("/aTableData");
                    if (aTableData.length > 0) {
                        if (checkButtonPress === true) {
                            var WrongQuantity = [];
                            var GateQuantityEmpty = [];
                            for (var D = 0; D < aTableData.length; D++) {
                                if ((Number(aTableData[D].tolerancequantity)) - (Number(aTableData[D].GateDoneQuantity)) < Number(aTableData[D].GateQuantity)) {
                                    WrongQuantity.push("Error")
                                    aTableData[D].GateQuantity_ValueState = "Error"
                                }
                                if (aTableData[D].GateQuantity == "" || aTableData[D].GateQuantity == null || aTableData[D].GateQuantity == 0 || aTableData[D].GateQuantity == "0.000") {
                                    GateQuantityEmpty.push("Error")
                                    aTableData[D].GateQuantity_ValueState = "Error"
                                }
                            }
                            if (GateQuantityEmpty.length != "") {
                                MessageBox.error("Please Enter Gate Quantity First", {
                                    onClose: function (oAction) {
                                        if (oAction === MessageBox.Action.OK) {
                                            oTableModel.setProperty("/aTableData", aTableData)
                                        }
                                    }.bind(this)
                                });
                            }
                            else if (WrongQuantity.length != 0) {
                                MessageBox.error("Gate Quantity Can't be Grator Then Order Quantity", {
                                    onClose: function (oAction) {
                                        if (oAction === MessageBox.Action.OK) {
                                            oTableModel.setProperty("/aTableData", aTableData)
                                        }
                                    }.bind(this)
                                });
                            } else {
                                var GateEntryAction = this.getView().getModel("oFirstScrennDataModel").getProperty("/GateEntryAction")
                                if (GateEntryAction === "Create") { this.SaveGateEntryforCreate() }
                                else if (GateEntryAction === "Change") { this.SaveGateEntryforChange() }
                                else if (GateEntryAction === "Gate Out") { this.SaveGateEntryforGateOut() }
                            }
                        } else {
                            MessageBox.error("Check Invoice Number First");
                        }
                    } else {
                        MessageBox.error("Please Enter Gate Entry Line Item First")
                        // var GateEntryAction = this.getView().getModel("oFirstScrennDataModel").getProperty("/GateEntryAction")
                        // if (GateEntryAction === "Create") { this.SaveGateEntryforCreate() }
                        // else if (GateEntryAction === "Change") { this.SaveGateEntryforChange() }
                        // else if (GateEntryAction === "Gate Out") { this.SaveGateEntryforGateOut() }
                    }
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
                if (this.getView().byId("ReportingDate").getValue() != "") {
                    var ReportingDate = new Date(this.getView().byId("ReportingDate").getValue());
                    var ReportingDate1 = new Date(ReportingDate.getTime() - ReportingDate.getTimezoneOffset() * 60000);
                    var ReportingDate2 = ReportingDate1.toISOString().slice(0, 16);
                }
                const ReportingTime = this.getView().byId("ReportingTime").getValue();
                const [ReportingTime_hours, ReportingTime_minutes, ReportingTime_seconds] = ReportingTime.split(':').map(Number);
                const ReportingTime1 = `PT${ReportingTime_hours}H${ReportingTime_minutes}M${ReportingTime_seconds}S`;

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
                if (this.getView().byId("GateInDate").getValue() != "") {
                    var GateInDate = new Date(this.getView().byId("GateInDate").getValue());
                    var GateInDate1 = new Date(GateInDate.getTime() - GateInDate.getTimezoneOffset() * 60000);
                    var GateInDate2 = GateInDate1.toISOString().slice(0, 16);
                }
                const GateInTime = this.getView().byId("GateInTime").getValue();
                const [GateInTime_hours, GateInTime_minutes, GateInTime_seconds] = GateInTime.split(':').map(Number);
                const GateInTime1 = `PT${GateInTime_hours}H${GateInTime_minutes}M${GateInTime_seconds}S`;
                if (this.getView().byId("VehicleInsurance").getValue() != "") {
                    var VehicleInsurance = new Date(this.getView().byId("VehicleInsurance").getValue());
                    var VehicleInsurance1 = new Date(VehicleInsurance.getTime() - VehicleInsurance.getTimezoneOffset() * 60000);
                    var VehicleInsurance2 = VehicleInsurance1.toISOString().slice(0, 16);
                }
                for (var D = 0; D < aTableData.length; D++) {
                    aTableArr.push({
                        "Ebeln": aTableData[D].PoNumber,
                        "Ebelp": aTableData[D].PoLineItem,
                        "GateItem": aTableData[D].GateItem,
                        "Lifnr": aTableData[D].VenderCode,
                        "Name1": aTableData[D].VenderName,
                        "Matnr": aTableData[D].MaterialCode,
                        "Maktx": aTableData[D].MaterialDescription,
                        "OrderQty": aTableData[D].OrderQuantity,
                        // "NetPriceAmount": aTableData[D].UnitPriceinPo,
                        "GateQty": aTableData[D].GateQuantity,
                        "OpenQty": aTableData[D].GateDoneQuantity,
                        "Uom": aTableData[D].Unit,
                        "Remark": aTableData[D].Remarks,
                    })
                }
                
                this.getView().getModel("oSupplierDataModel").setProperty("/aSupplierData", (aTableData[0].VenderCode).padStart(10, '0'));
                var companycode = this.getView().getModel("oFirstScrennDataModel").getProperty("/CompanyCode");
                var num = "";
                if (companycode === "1000" && PurchaseType_RaworStore == "Raw") {
                    num = "02"
                } else if (companycode === "2000" && PurchaseType_RaworStore == "Raw") {
                    num = "09"
                } else if (companycode === "1000" && PurchaseType_RaworStore == "Store") {
                    num = "01"
                } else if (companycode === "2000" && PurchaseType_RaworStore == "Store") {
                    num = "08"
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
                            "Lifnr": this.getView().getModel("oSupplierDataModel").getProperty("/aSupplierData"),
                            "Plant": this.getView().byId("Plant").getValue(),
                            "Entrydate": this.getView().byId("ReportingDate").getValue() == "" || this.getView().byId("ReportingDate").getValue() == "0.00" ? null : ReportingDate2,
                            "Entrytime": this.getView().byId("ReportingTime").getValue() == "" || this.getView().byId("ReportingTime").getValue() == "0.00" ? null : ReportingTime1,
                            "VehicalNo": this.getView().byId("VehicleNo").getValue(),
                            "Challan": this.getView().byId("ChallanQty").getValue(),
                            "GateInDt": this.getView().byId("GateInDate").getValue() == "" || this.getView().byId("GateInDate").getValue() == "0.00" ? null : GateInDate2,
                            "GateInTm": this.getView().byId("GateInTime").getValue() == "" || this.getView().byId("GateInTime").getValue() == "0.00" ? null : GateInTime1,

                            "Puchgrp": this.getView().byId("PurchaseGroup").getValue(),
                            "Invdt": this.getView().byId("InvoiceDate").getValue() == "" || this.getView().byId("InvoiceDate").getValue() == "0.00" ? null : InvoiceDate2,
                            "Invoice": this.getView().byId("InvoiceNo").getValue(),

                            "Operator": this.getView().byId("OperatorName").getValue(),
                            // "GateOutDt": this.getView().byId("GateOutDate").getValue() == "" || this.getView().byId("GateOutDate").getValue() == "0.00" ? null : GateOutDate1,
                            // "GateOutTm": this.getView().byId("GateOutTime").getValue() == "" || this.getView().byId("GateOutTime").getValue() == "0.00" ? null : GateOut_Time,
                            "LrDate": this.getView().byId("LRDate").getValue() == "" || this.getView().byId("LRDate").getValue() == "0.00" ? null : LRDate2,
                            "Vehiclercdate": this.getView().byId("VehicleRCDate").getValue() == "" || this.getView().byId("VehicleRCDate").getValue() == "0.00" ? null : VehicleRCDate2,
                            "Driverlicense": this.getView().byId("DriverLicenseExpiryDate").getValue() == "" || this.getView().byId("DriverLicenseExpiryDate").getValue() == "0.00" ? null : DriverLicenseExpiryDate2,
                            "Vehiclefitness": this.getView().byId("VehicleFitnessCertificate").getValue() == "" || this.getView().byId("VehicleFitnessCertificate").getValue() == "0.00" ? null : VehicleFitnessCertificate2,
                            "Vehicleinsurance": this.getView().byId("VehicleInsurance").getValue() == "" || this.getView().byId("VehicleInsurance").getValue() == "0.00" ? null : VehicleInsurance2,
                            "LrNo": this.getView().byId("LRNumber").getValue(),

                            "Remark": this.getView().byId("Remark").getValue(),
                            "Name1": this.getView().byId("ModeofTransport").getValue(),
                            "TrOper": this.getView().byId("TransporterName").getValue(),
                            "Driver": this.getView().byId("DriverName").getValue(),
                            "Driverno": this.getView().byId("DriverMobileNo").getValue(),
                            "DrLisc": this.getView().byId("DriverLicenseNo").getValue(),
                            "Driveralcoholic": this.getView().byId("DriverAlcoholic").getSelectedIndex() === 0 ? "Yes" : this.getView().byId("DriverAlcoholic").getSelectedIndex() === 1 ? "No" : "",
                            "Flammablesubstance": this.getView().byId("FlammableSubstance").getSelectedIndex() === 0 ? "Yes" : this.getView().byId("FlammableSubstance").getSelectedIndex() === 1 ? "No" : "",
                            "Firesafety": this.getView().byId("FireSafety").getSelectedIndex() === 0 ? "Yes" : this.getView().byId("FireSafety").getSelectedIndex() === 1 ? "No" : "",
                            "Reversehorn": this.getView().byId("ReverseHorn").getSelectedIndex() === 0 ? "Yes" : this.getView().byId("ReverseHorn").getSelectedIndex() === 1 ? "No" : "",

                            "Vehiclepuc": this.getView().byId("VehiclePUCNo").getValue(),
                            "GrossWt": (this.getView().byId("GrossWeight").getValue()).length === 0 ? "0.00" : this.getView().byId("GrossWeight").getValue(),
                            "TareWt": (this.getView().byId("TareWeight").getValue()).length === 0 ? "0.00" : this.getView().byId("TareWeight").getValue(),
                            "NetWt": (this.getView().byId("NetWaight").getValue()).length === 0 ? "0.00" : this.getView().byId("NetWaight").getValue(),
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
                if (this.getView().byId("ReportingDate").getValue() != "") {
                    var ReportingDate = new Date(this.getView().byId("ReportingDate").getValue());
                    var ReportingDate1 = new Date(ReportingDate.getTime() - ReportingDate.getTimezoneOffset() * 60000);
                    var ReportingDate2 = ReportingDate1.toISOString().slice(0, 16);
                }
                const ReportingTime = this.getView().byId("ReportingTime").getValue();
                const [ReportingTime_hours, ReportingTime_minutes, ReportingTime_seconds] = ReportingTime.split(':').map(Number);
                const ReportingTime1 = `PT${ReportingTime_hours}H${ReportingTime_minutes}M${ReportingTime_seconds}S`;


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
                var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Y1416_GATE");
                var oTableModel = this.getView().getModel("oTableDataModel");
                var aTableData = oTableModel.getProperty("/aTableData");
                this.getView().getModel("oSupplierDataModel").setProperty("/aSupplierData", (aTableData[0].VenderCode).padStart(10, '0'));
                var oGateEntryHeaderData = {
                    "Gateno": this.getView().byId("GateEntryNumber").getValue(),
                    "EntryType": this.getView().byId("GateEntryType").getValue(),
                    "Plant": this.getView().byId("Plant").getValue(),
                    "Entrydate": this.getView().byId("ReportingDate").getValue() == "" || this.getView().byId("ReportingDate").getValue() == "0.00" ? "0.00" : ReportingDate2,
                    "Entrytime": this.getView().byId("ReportingTime").getValue() == "" || this.getView().byId("ReportingTime").getValue() == "0.00" ? "0.00" : ReportingTime1,
                    "VehicalNo": this.getView().byId("VehicleNo").getValue(),
                    "Challan": this.getView().byId("ChallanQty").getValue(),
                    "Lifnr": this.getView().getModel("oSupplierDataModel").getProperty("/aSupplierData"),

                    "Puchgrp": this.getView().byId("PurchaseGroup").getValue(),
                    "Invdt": this.getView().byId("InvoiceDate").getValue() == "" || this.getView().byId("InvoiceDate").getValue() == "0.00" ? "0.00" : InvoiceDate2,
                    "Invoice": this.getView().byId("InvoiceNo").getValue(),

                    "Operator": this.getView().byId("OperatorName").getValue(),
                    "GateInDt": this.getView().byId("GateInDate").getValue() == "" || this.getView().byId("GateInDate").getValue() == "0.00" ? "0.00" : GateInDate2,
                    "GateInTm": this.getView().byId("GateInTime").getValue() == "" || this.getView().byId("GateInTime").getValue() == "0.00" ? "0.00" : GateIn_Time,
                    "GateOutDt": this.getView().byId("GateOutDate").getValue() == "" || this.getView().byId("GateOutDate").getValue() == "0.00" ? "0.00" : GateOutDate2,
                    "GateOutTm": this.getView().byId("GateOutTime").getValue() == "" || this.getView().byId("GateOutTime").getValue() == "0.00" ? "0.00" : GateOut_Time,
                    "LrDate": this.getView().byId("LRDate").getValue() == "" || this.getView().byId("LRDate").getValue() == "0.00" ? "0.00" : LRDate2,
                    "Vehiclercdate": this.getView().byId("VehicleRCDate").getValue() == "" || this.getView().byId("VehicleRCDate").getValue() == "0.00" ? null : VehicleRCDate2,
                    "Driverlicense": this.getView().byId("DriverLicenseExpiryDate").getValue() == "" || this.getView().byId("DriverLicenseExpiryDate").getValue() == "0.00" ? "0.00" : DriverLicenseExpiryDate2,
                    "LrNo": this.getView().byId("LRNumber").getValue(),
                    "Remark": this.getView().byId("Remark").getValue(),
                    "Name1": this.getView().byId("ModeofTransport").getValue(),
                    "TrOper": this.getView().byId("TransporterName").getValue(),
                    "Driver": this.getView().byId("DriverName").getValue(),
                    "Driverno": this.getView().byId("DriverMobileNo").getValue(),
                    "DrLisc": this.getView().byId("DriverLicenseNo").getValue(),
                    "Driveralcoholic": this.getView().byId("DriverAlcoholic").getSelectedIndex() === 0 ? "Yes" : this.getView().byId("DriverAlcoholic").getSelectedIndex() === 1 ? "No" : "",
                    "Flammablesubstance": this.getView().byId("FlammableSubstance").getSelectedIndex() === 0 ? "Yes" : this.getView().byId("FlammableSubstance").getSelectedIndex() === 1 ? "No" : "",
                    "Firesafety": this.getView().byId("FireSafety").getSelectedIndex() === 0 ? "Yes" : this.getView().byId("FireSafety").getSelectedIndex() === 1 ? "No" : "",
                    "Reversehorn": this.getView().byId("ReverseHorn").getSelectedIndex() === 0 ? "Yes" : this.getView().byId("ReverseHorn").getSelectedIndex() === 1 ? "No" : "",
                    "Vehiclefitness": this.getView().byId("VehicleFitnessCertificate").getValue() == "" || this.getView().byId("VehicleFitnessCertificate").getValue() == "0.00" ? null : VehicleFitnessCertificate2,
                    "Vehicleinsurance": this.getView().byId("VehicleInsurance").getValue() == "" || this.getView().byId("VehicleInsurance").getValue() == "0.00" ? null : VehicleInsurance2,

                    "Vehiclepuc": this.getView().byId("VehiclePUCNo").getValue(),
                    "GrossWt": (this.getView().byId("GrossWeight").getValue()).length === 0 ? "0.00" : this.getView().byId("GrossWeight").getValue(),
                    "TareWt": (this.getView().byId("TareWeight").getValue()).length === 0 ? "0.00" : this.getView().byId("TareWeight").getValue(),
                    "NetWt": (this.getView().byId("NetWaight").getValue()).length === 0 ? "0.00" : this.getView().byId("NetWaight").getValue(),
                }


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
                            "Lifnr": item.VenderCode,
                            "Name1": item.VenderName,
                            "Matnr": item.MaterialCode,
                            "Maktx": item.MaterialDescription,
                            "OrderQty": item.OrderQuantity,
                            // "NetPriceAmount": Number(item.UnitPriceinPo),
                            "GateQty": item.GateQuantity,
                            "OpenQty": item.GateDoneQuantity,
                            "Uom": item.Unit,
                            "Remark": item.Remarks,
                        }
                        if (item.BackendDataAvl === true) {
                            oModel.update("/zgateitem_ent(Gateno='" + gateEntryNumber + "',GateItem='" + item.GateItem + "')", obj, {
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
                if (this.getView().byId("ReportingDate").getValue() != "") {
                    var ReportingDate = new Date(this.getView().byId("ReportingDate").getValue());
                    var ReportingDate1 = new Date(ReportingDate.getTime() - ReportingDate.getTimezoneOffset() * 60000);
                    var ReportingDate2 = ReportingDate1.toISOString().slice(0, 16);
                }
                const ReportingTime = this.getView().byId("ReportingTime").getValue();
                const [ReportingTime_hours, ReportingTime_minutes, ReportingTime_seconds] = ReportingTime.split(':').map(Number);
                const ReportingTime1 = `PT${ReportingTime_hours}H${ReportingTime_minutes}M${ReportingTime_seconds}S`;


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
                var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Y1416_GATE");
                var oTableModel = this.getView().getModel("oTableDataModel");
                var aTableData = oTableModel.getProperty("/aTableData");
                this.getView().getModel("oSupplierDataModel").setProperty("/aSupplierData", (aTableData[0].VenderCode).padStart(10, '0'));
                var oGateEntryHeaderData = {
                    "Gateno": this.getView().byId("GateEntryNumber").getValue(),
                    "EntryType": this.getView().byId("GateEntryType").getValue(),
                    "Plant": this.getView().byId("Plant").getValue(),
                    "Entrydate": this.getView().byId("ReportingDate").getValue() == "" || this.getView().byId("ReportingDate").getValue() == "0.00" ? "0.00" : ReportingDate2,
                    "Entrytime": this.getView().byId("ReportingTime").getValue() == "" || this.getView().byId("ReportingTime").getValue() == "0.00" ? "0.00" : ReportingTime1,
                    "VehicalNo": this.getView().byId("VehicleNo").getValue(),
                    "Challan": this.getView().byId("ChallanQty").getValue(),
                    "Lifnr": this.getView().getModel("oSupplierDataModel").getProperty("/aSupplierData"),

                    "Puchgrp": this.getView().byId("PurchaseGroup").getValue(),
                    "Invdt": this.getView().byId("InvoiceDate").getValue() == "" || this.getView().byId("InvoiceDate").getValue() == "0.00" ? "0.00" : InvoiceDate2,
                    "Invoice": this.getView().byId("InvoiceNo").getValue(),

                    "Operator": this.getView().byId("OperatorName").getValue(),
                    "GateInDt": this.getView().byId("GateInDate").getValue() == "" || this.getView().byId("GateInDate").getValue() == "0.00" ? "0.00" : GateInDate2,
                    "GateInTm": this.getView().byId("GateInTime").getValue() == "" || this.getView().byId("GateInTime").getValue() == "0.00" ? "0.00" : GateIn_Time,
                    "GateOutDt": this.getView().byId("GateOutDate").getValue() == "" || this.getView().byId("GateOutDate").getValue() == "0.00" ? "0.00" : GateOutDate2,
                    "GateOutTm": this.getView().byId("GateOutTime").getValue() == "" || this.getView().byId("GateOutTime").getValue() == "0.00" ? "0.00" : GateOut_Time,
                    "LrDate": this.getView().byId("LRDate").getValue() == "" || this.getView().byId("LRDate").getValue() == "0.00" ? "0.00" : LRDate2,
                    "Vehiclercdate": this.getView().byId("VehicleRCDate").getValue() == "" || this.getView().byId("VehicleRCDate").getValue() == "0.00" ? null : VehicleRCDate2,
                    "Driverlicense": this.getView().byId("DriverLicenseExpiryDate").getValue() == "" || this.getView().byId("DriverLicenseExpiryDate").getValue() == "0.00" ? "0.00" : DriverLicenseExpiryDate2,
                    "LrNo": this.getView().byId("LRNumber").getValue(),
                    "Remark": this.getView().byId("Remark").getValue(),
                    "Name1": this.getView().byId("ModeofTransport").getValue(),
                    "TrOper": this.getView().byId("TransporterName").getValue(),
                    "Driver": this.getView().byId("DriverName").getValue(),
                    "Driverno": this.getView().byId("DriverMobileNo").getValue(),
                    "DrLisc": this.getView().byId("DriverLicenseNo").getValue(),
                    "Driveralcoholic": this.getView().byId("DriverAlcoholic").getSelectedIndex() === 0 ? "Yes" : this.getView().byId("DriverAlcoholic").getSelectedIndex() === 1 ? "No" : "",
                    "Flammablesubstance": this.getView().byId("FlammableSubstance").getSelectedIndex() === 0 ? "Yes" : this.getView().byId("FlammableSubstance").getSelectedIndex() === 1 ? "No" : "",
                    "Firesafety": this.getView().byId("FireSafety").getSelectedIndex() === 0 ? "Yes" : this.getView().byId("FireSafety").getSelectedIndex() === 1 ? "No" : "",
                    "Reversehorn": this.getView().byId("ReverseHorn").getSelectedIndex() === 0 ? "Yes" : this.getView().byId("ReverseHorn").getSelectedIndex() === 1 ? "No" : "",
                    "Vehiclefitness": this.getView().byId("VehicleFitnessCertificate").getValue() == "" || this.getView().byId("VehicleFitnessCertificate").getValue() == "0.00" ? null : VehicleFitnessCertificate2,
                    "Vehicleinsurance": this.getView().byId("VehicleInsurance").getValue() == "" || this.getView().byId("VehicleInsurance").getValue() == "0.00" ? null : VehicleInsurance2,

                    "Vehiclepuc": this.getView().byId("VehiclePUCNo").getValue(),
                    "GrossWt": (this.getView().byId("GrossWeight").getValue()).length === 0 ? "0.00" : this.getView().byId("GrossWeight").getValue(),
                    "TareWt": (this.getView().byId("TareWeight").getValue()).length === 0 ? "0.00" : this.getView().byId("TareWeight").getValue(),
                    "NetWt": (this.getView().byId("NetWaight").getValue()).length === 0 ? "0.00" : this.getView().byId("NetWaight").getValue(),
                }

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
                            "Lifnr": item.VenderCode,
                            "Name1": item.VenderName,
                            "Matnr": item.MaterialCode,
                            "Maktx": item.MaterialDescription,
                            "OrderQty": item.OrderQuantity,
                            // "NetPriceAmount": Number(item.UnitPriceinPo),
                            "GateQty": item.GateQuantity,
                            "OpenQty": item.GateDoneQuantity,
                            "Uom": item.Unit,
                            "Remark": item.Remarks,
                        }
                        if (item.BackendDataAvl === true) {
                            oModel.update("/zgateitem_ent(Gateno='" + gateEntryNumber + "',GateItem='" + item.GateItem + "')", obj, {
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






            valueStatefor_VehicleNo: function (oEvent) {
                if (oEvent.mParameters.value) {
                    this.getView().byId("VehicleNo").setValueState("None");
                } else {
                    this.getView().byId("VehicleNo").setValueState("Error");
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
            valueStatefor_OperatorName: function (oEvent) {
                if (oEvent.mParameters.value) {
                    this.getView().byId("OperatorName").setValueState("None");
                    this.getView().byId("OperatorName").setValue(oEvent.mParameters.value.replace(/\b\w/g, (l) => l.toUpperCase()))
                } else {
                    this.getView().byId("OperatorName").setValueState("Error");
                }
            },
            valueStatefor_InvoiceNo: function (oEvent) {
                if (oEvent.mParameters.value) {
                    this.getView().byId("InvoiceNo").setValueState("None");
                } else {
                    this.getView().byId("InvoiceNo").setValueState("Error");
                }
            },
            valueStatefor_InvoiceDate: function (oEvent) {
                if (oEvent.mParameters.value) {
                    this.getView().byId("InvoiceDate").setValueState("None");
                } else {
                    this.getView().byId("InvoiceDate").setValueState("Error");
                }
            },
            valueStatefor_PoNumber: function (oEvent) {
                if (oEvent.mParameters.value) {
                    this.getView().byId("PoNumber").setValueState("None");
                } else {
                    this.getView().byId("PoNumber").setValueState("Error");
                }
            },
            netWeightCalculate_byGrossWaight: function (oEvent) {
                this.getView().byId("GrossWeight").setValueState("None");
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
            GateQuantityLiveChange: function (oEvent) {
                var GateQuantity = Number(oEvent.mParameters.value);
                var oContext = oEvent.getSource().getBindingContext('oTableDataModel').getObject();
                var tolerancequantity = Number(oContext.tolerancequantity);
                var GateDoneQuantity = Number(oContext.GateDoneQuantity);
                if ((tolerancequantity - GateDoneQuantity) < GateQuantity) {
                    oContext.GateQuantity_ValueState = "Error";
                } else {
                    oContext.GateQuantity_ValueState = "None";
                }

            },
            CheckInvoiceNumber: function () {
                var InvoiceNumber = this.getView().byId("InvoiceNo").getValue();
                var aTableArr = this.getView().getModel("oTableDataModel").getProperty("/aTableData")
                var VenderCode = aTableArr[0].VenderCode;
                var oFilter = new sap.ui.model.Filter("invoice", "EQ", InvoiceNumber);
                var oFilter1 = new sap.ui.model.Filter("supplier", "EQ", VenderCode);
                var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZGATE_INV_BINDING")
                var InvoiceNumber1 = this.getView().byId("InvoiceNo");
                oModel.read("/inv", {
                    filters: [oFilter, oFilter1],
                    urlParameters: {
                        "$top": "5000"
                    },
                    success: function (oresponse) {
                        if (oresponse.results.length != 0) {
                            checkButtonPress = false;
                            MessageBox.warning(InvoiceNumber + " Invoices Have Already Been Raised for " + VenderCode + " Suppliers")
                            InvoiceNumber1.setValueState("Warning");
                            InvoiceNumber1.setValue()
                        } else {
                            checkButtonPress = true;
                            InvoiceNumber1.setValueState("Success");
                            function myFunction() {
                                InvoiceNumber1.setValueState("None");
                            }
                            setTimeout(myFunction, 3000);
                        }
                    }.bind(this)
                })
            },
        });
    });
