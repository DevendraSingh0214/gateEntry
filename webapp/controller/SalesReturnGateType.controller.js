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

        return Controller.extend("zgateentry.controller.SalesReturnGateType", {
            onInit: function () {
                this.getView().setModel(new sap.ui.model.json.JSONModel, "oTableDataModel");
                UIComponent.getRouterFor(this).getRoute('SalesReturnGateType').attachPatternMatched(this.ScreenRefrash, this);
                UIComponent.getRouterFor(this).getRoute('SalesReturnGateType').attachPatternMatched(this.CallGateEntryData, this);
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
                this.getView().byId("ContainerNo").setValue()
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
                this.getView().byId("Invoice").setValue()
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
            callGateEntryDataforCreate: function () {
                this.getView().byId("GateEntryNumber").setEditable(false)
                this.getView().byId("GateEntryType").setEditable(false)
                this.getView().byId("Plant").setEditable(false)
                this.getView().byId("GateInDate").setEditable(false)
                this.getView().byId("GateInTime").setEditable(false)
                this.getView().byId("GateOutDate").setVisible(false)
                this.getView().byId("GateOutTime").setVisible(false)


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
                const currentTime = currentDate.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false });
                // this.getView().byId("GateInTime").setValue(currentTime)
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
                this.getView().byId("GateInDate").setEditable(false)
                this.getView().byId("GateInTime").setEditable(false)


                this.getView().byId("GateOutDate").setVisible(true)
                this.getView().byId("GateOutTime").setVisible(true)
                this.getView().byId("GateOutDate").setEditable(false)
                this.getView().byId("GateOutTime").setEditable(false)


                var currentDate = new Date()
                var currentDate1 = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1).toString().padStart(2, "0") + "-" + (currentDate.getDate()).toString().padStart(2, "0");
                this.getView().byId("GateOutDate").setValue(currentDate1)
                const currentTime = currentDate.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false });
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
                                // var inputDate = new Date(ores.results[0].Entrydate.split("-").reverse().join("-"));
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
                            this.getView().byId("ContainerNo").setValue(ores.results[0].Container)
                            this.getView().byId("OperatorName").setValue(ores.results[0].Operator)
                            if (ores.results[0].GateInDt == "" || ores.results[0].GateInDt == "0.00") {
                                this.getView().byId("GateInDate").setValue()
                            } else {
                                const GateInDate = new Date(ores.results[0].GateInDt);
                                const GateInDate1 = `${GateInDate.getFullYear()}-${GateInDate.getMonth() + 1 < 10 ? '0' : ''}${GateInDate.getMonth() + 1}-${GateInDate.getDate() < 10 ? '0' : ''}${GateInDate.getDate()}`;
                                this.getView().byId("GateInDate").setValue(GateInDate1)
                            }

                            this.getView().byId("GateInTime").setValue(ores.results[0].GateInTm)
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
                            this.getView().byId("VehicleFitnessCertificate").setValue(ores.results[0].Vehiclefitness)
                            if (ores.results[0].Vehiclercdate == "" || ores.results[0].Vehiclercdate == "0.00") {
                                this.getView().byId("VehicleRCDate").setValue()
                            } else {
                                const VehicleRCDate = new Date(ores.results[0].Vehiclercdate);
                                const VehicleRCDate1 = `${VehicleRCDate.getFullYear()}-${VehicleRCDate.getMonth() + 1 < 10 ? '0' : ''}${VehicleRCDate.getMonth() + 1}-${VehicleRCDate.getDate() < 10 ? '0' : ''}${VehicleRCDate.getDate()}`;
                                this.getView().byId("VehicleRCDate").setValue(VehicleRCDate1)
                            }
                            this.getView().byId("VehicleInsurance").setValue(ores.results[0].Vehicleinsurance)
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
                                    "SalesDocument": ores.results[0].to_gateitem.results[D].Sono,
                                    "Invoice": ores.results[0].to_gateitem.results[D].Zinvoice,
                                    "DelivaryNumber": ores.results[0].to_gateitem.results[D].Delievery,
                                    "Item": ores.results[0].to_gateitem.results[D].GateItem,
                                    "CustomerCode": ores.results[0].to_gateitem.results[D].Lifnr,
                                    "CustomerName": ores.results[0].to_gateitem.results[D].Name1,
                                    "MaterialCode": ores.results[0].to_gateitem.results[D].Matnr,
                                    "DelivaryQuantity": ores.results[0].to_gateitem.results[D].OrderQty,
                                    "Package": ores.results[0].to_gateitem.results[D].ZbagQty,
                                    "MaterialDescription": ores.results[0].to_gateitem.results[D].Maktx,
                                    "UOM": ores.results[0].to_gateitem.results[D].Uom,
                                    "Remarks": ores.results[0].to_gateitem.results[D].Remark,
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
                                var inputDate = new Date(ores.results[0].Entrydate.split("-").reverse().join("-"));
                                var ReportingDate1 = inputDate.toISOString().split('T')[0];
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
                            this.getView().byId("ContainerNo").setValue(ores.results[0].Container)
                            this.getView().byId("OperatorName").setValue(ores.results[0].Operator)
                            if (ores.results[0].GateInDt == "" || ores.results[0].GateInDt == "0.00") {
                                this.getView().byId("GateInDate").setValue()
                            } else {
                                var inputDate = new Date(ores.results[0].GateInDt.split("-").reverse().join("-"));
                                var GateInDt1 = inputDate.toISOString().split('T')[0];
                                this.getView().byId("GateInDate").setValue(GateInDt1)
                            }

                            this.getView().byId("GateInTime").setValue(ores.results[0].GateInTm)
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
                            this.getView().byId("VehicleFitnessCertificate").setValue(ores.results[0].Vehiclefitness)
                            if (ores.results[0].Vehiclercdate == "" || ores.results[0].Vehiclercdate == "0.00") {
                                this.getView().byId("VehicleRCDate").setValue()
                            } else {
                                const VehicleRCDate = new Date(ores.results[0].Vehiclercdate);
                                const VehicleRCDate1 = `${VehicleRCDate.getFullYear()}-${VehicleRCDate.getMonth() + 1 < 10 ? '0' : ''}${VehicleRCDate.getMonth() + 1}-${VehicleRCDate.getDate() < 10 ? '0' : ''}${VehicleRCDate.getDate()}`;
                                this.getView().byId("VehicleRCDate").setValue(VehicleRCDate1)
                            }
                            this.getView().byId("VehicleInsurance").setValue(ores.results[0].Vehicleinsurance)
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
                                    "SalesDocument": ores.results[0].to_gateitem.results[D].Sono,
                                    "Invoice": ores.results[0].to_gateitem.results[D].Zinvoice,
                                    "DelivaryNumber": ores.results[0].to_gateitem.results[D].Delievery,
                                    "Item": ores.results[0].to_gateitem.results[D].GateItem,
                                    "CustomerCode": ores.results[0].to_gateitem.results[D].Lifnr,
                                    "CustomerName": ores.results[0].to_gateitem.results[D].Name1,
                                    "MaterialCode": ores.results[0].to_gateitem.results[D].Matnr,
                                    "DelivaryQuantity": ores.results[0].to_gateitem.results[D].OrderQty,
                                    "Package": ores.results[0].to_gateitem.results[D].ZbagQty,
                                    "MaterialDescription": ores.results[0].to_gateitem.results[D].Maktx,
                                    "UOM": ores.results[0].to_gateitem.results[D].Uom,
                                    "Remarks": ores.results[0].to_gateitem.results[D].Remark,
                                })
                            }
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

                this.getView().byId("GateOutDate").setVisible(true)
                this.getView().byId("GateOutTime").setVisible(true)
                this.getView().byId("GateOutDate").setEditable(false)
                this.getView().byId("GateOutTime").setEditable(false)


                var currentDate = new Date()
                var currentDate1 = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1).toString().padStart(2, "0") + "-" + (currentDate.getDate()).toString().padStart(2, "0");
                this.getView().byId("GateOutDate").setValue(currentDate1)
                const currentTime = currentDate.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false });
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
                                var inputDate = new Date(ores.results[0].Entrydate.split("-").reverse().join("-"));
                                var ReportingDate1 = inputDate.toISOString().split('T')[0];
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
                            this.getView().byId("ContainerNo").setValue(ores.results[0].Container)
                            this.getView().byId("OperatorName").setValue(ores.results[0].Operator)
                            // if (ores.results[0].GateInDt == "" || ores.results[0].GateInDt == "0.00") {
                            //     this.getView().byId("GateInDate").setValue()
                            // } else {
                            //     var inputDate = new Date(ores.results[0].GateInDt.split("-").reverse().join("-"));
                            //     var GateInDt1 = inputDate.toISOString().split('T')[0];
                            //     this.getView().byId("GateInDate").setValue(GateInDt1)
                            // }
                            // this.getView().byId("GateInTime").setValue(ores.results[0].GateInTm)
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
                            this.getView().byId("VehicleFitnessCertificate").setValue(ores.results[0].Vehiclefitness)
                            if (ores.results[0].Vehiclercdate == "" || ores.results[0].Vehiclercdate == "0.00") {
                                this.getView().byId("VehicleRCDate").setValue()
                            } else {
                                const VehicleRCDate = new Date(ores.results[0].Vehiclercdate);
                                const VehicleRCDate1 = `${VehicleRCDate.getFullYear()}-${VehicleRCDate.getMonth() + 1 < 10 ? '0' : ''}${VehicleRCDate.getMonth() + 1}-${VehicleRCDate.getDate() < 10 ? '0' : ''}${VehicleRCDate.getDate()}`;
                                this.getView().byId("VehicleRCDate").setValue(VehicleRCDate1)
                            }
                            this.getView().byId("VehicleInsurance").setValue(ores.results[0].Vehicleinsurance)
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
                                    "SalesDocument": ores.results[0].to_gateitem.results[D].Sono,
                                    "Invoice": ores.results[0].to_gateitem.results[D].Zinvoice,
                                    "DelivaryNumber": ores.results[0].to_gateitem.results[D].Delievery,
                                    "Item": ores.results[0].to_gateitem.results[D].GateItem,
                                    "CustomerCode": ores.results[0].to_gateitem.results[D].Lifnr,
                                    "CustomerName": ores.results[0].to_gateitem.results[D].Name1,
                                    "MaterialCode": ores.results[0].to_gateitem.results[D].Matnr,
                                    "DelivaryQuantity": ores.results[0].to_gateitem.results[D].OrderQty,
                                    "Package": ores.results[0].to_gateitem.results[D].ZbagQty,
                                    "MaterialDescription": ores.results[0].to_gateitem.results[D].Maktx,
                                    "UOM": ores.results[0].to_gateitem.results[D].Uom,
                                    "Remarks": ores.results[0].to_gateitem.results[D].Remark,
                                })
                            }
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
                    this.getView().byId("ContainerNo").setEditable(false);
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
                    this.getView().byId("Invoice").setEditable(false);
                    this.getView().byId("GrossWeight").setEditable(false);
                    this.getView().byId("TareWeight").setEditable(false);
                    this.getView().byId("NetWaight").setEditable(false)

                    this.getView().byId("GetTableData").setVisible(false)
                    // this.getView().byId("Table_AddButton").setVisible(false)
                    this.getView().byId("Table_DeleteButton").setVisible(false)
                    this.getView().byId("Table_SaveButton").setVisible(false)
                } else {
                    this.getView().byId("GateEntryNumber").setEditable(true);
                    this.getView().byId("GateEntryType").setEditable(true);
                    this.getView().byId("Plant").setEditable(true);
                    this.getView().byId("ReportingDate").setEditable(true);
                    this.getView().byId("ReportingTime").setEditable(true);
                    this.getView().byId("VehicleNo").setEditable(true);
                    this.getView().byId("ChallanQty").setEditable(true);
                    this.getView().byId("ContainerNo").setEditable(true);
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
                    this.getView().byId("Invoice").setEditable(true);
                    this.getView().byId("GrossWeight").setEditable(true);
                    this.getView().byId("TareWeight").setEditable(true);
                    this.getView().byId("NetWaight").setEditable(true);

                    this.getView().byId("GetTableData").setVisible(true)
                    // this.getView().byId("Table_AddButton").setVisible(true)
                    this.getView().byId("Table_DeleteButton").setVisible(false)
                    this.getView().byId("Table_SaveButton").setVisible(true)
                }


            },
            GetTableData: function () {
                var oBusy = new sap.m.BusyDialog({
                    text: "Please Wait"
                });
                oBusy.open();
                var Invoice = this.getView().byId("Invoice").getValue();
                var oFilter = new sap.ui.model.Filter("invoice", "EQ", Invoice);
                var oFilter_Gate_Item = new sap.ui.model.Filter("Delievery", "EQ", Invoice);
                var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Y1416_GATE");
                var oTableModel = this.getView().getModel("oTableDataModel");
                var aTableArr = oTableModel.getProperty("/aTableData");
                oModel.read("/delieverydata", {
                    filters: [oFilter],
                    urlParameters: {
                        "$top": "5000"
                    },
                    success: function (oresponse) {
                        if (aTableArr.length === 0) {
                            oresponse.results.map(function (items) {
                                if (items.delievered_quantity === "0.000") {
                                    var num = items.ActualDeliveryQuantity
                                } else {
                                    num = items.delievered_quantity;
                                }

                                var oValue = num.indexOf(".");
                                if (oValue != -1) {
                                    var num1 = num.slice(0, oValue);
                                    var qty = num.slice(oValue, oValue + 3);
                                    var num2 = num1 + qty;
                                } else if (items.delievered_quantity === "0.000") {
                                    num2 = items.ActualDeliveryQuantity;
                                } else {
                                    num2 = items.deliver;
                                }
                                var obj = {
                                    "SalesDocument": items.ReferenceSDDocument,
                                    "Invoice": items.invoice,
                                    "DelivaryNumber": items.DeliveryDocument,
                                    "Item": items.DeliveryDocumentItem,
                                    "CustomerCode": items.SoldToParty,
                                    "CustomerName": items.CustomerName,
                                    "MaterialCode": items.Material,
                                    "DelivaryQuantity": num2,
                                    "Package": items.zpackage.toString(),
                                    "MaterialDescription": items.material_description,
                                    "UOM": items.ItemWeightUnit,
                                    "BackendDataAvl": false,
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
                            oBusy.close();
                        } else {
                            oresponse.results.map(function (items) {
                                var lastGateItem = Number(aTableArr[aTableArr.length - 1].Item);
                                if (items.delievered_quantity === "0.000") {
                                    var num = items.ActualDeliveryQuantity
                                } else {
                                    num = items.delievered_quantity;
                                }

                                var oValue = num.indexOf(".");
                                if (oValue != -1) {
                                    var num1 = num.slice(0, oValue);
                                    var qty = num.slice(oValue, oValue + 3);
                                    var num2 = num1 + qty;
                                } else if (items.delievered_quantity === "0.000") {
                                    num2 = items.ActualDeliveryQuantity;
                                } else {
                                    num2 = items.deliver;
                                }
                                var obj = {
                                    "SalesDocument": items.ReferenceSDDocument,
                                    "Invoice": items.invoice,
                                    "DelivaryNumber": items.DeliveryDocument,
                                    "Item": (lastGateItem + 10).toString(),
                                    "CustomerCode": items.SoldToParty,
                                    "CustomerName": items.CustomerName,
                                    "MaterialCode": items.Material,
                                    "DelivaryQuantity": items.OrderQty,
                                    "Package": items.zpackage.toString(),
                                    "MaterialDescription": items.material_description,
                                    "UOM": items.ItemWeightUnit,
                                    "Remarks": "",
                                    "BackendDataAvl": false,
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
                        }
                    }.bind(this)
                })
            },
            DeleteTables_SelectedRow_Button_Visible: function () {
                var GateEntryAction = this.getView().getModel("oFirstScrennDataModel").getProperty("/GateEntryAction")
                if (GateEntryAction != "Display") {
                    var oTable = this.getView().byId("SalesReturnGateTypeTable").getSelectedIndices();
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
                var oTable = this.getView().byId("SalesReturnGateTypeTable");
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

            SaveGateEntry: function () {
                var vehicle = this.getView().byId("VehicleNo").getValue();
                var DriverName = this.getView().byId("DriverName").getValue();
                var DriverMobileNo = this.getView().byId("DriverMobileNo").getValue();
                if (DriverName != "" && DriverMobileNo != "" && vehicle != "") {
                    var GateEntryAction = this.getView().getModel("oFirstScrennDataModel").getProperty("/GateEntryAction")
                    if (GateEntryAction === "Create") { this.SaveGateEntryforCreate() }
                    else if (GateEntryAction === "Change") { this.SaveGateEntryforChange() }
                    else if (GateEntryAction === "Gate Out") { this.SaveGateEntryforGateOut() }
                } else {
                    var error = "";
                    if (DriverName == "") { error = error + "Please Enter Driver Name First\n\n"; this.getView().byId("DriverName").setValueState("Error"); }
                    if (DriverMobileNo == "") { error = error + "Please Enter Driver Mobile Number First\n\n"; this.getView().byId("DriverMobileNo").setValueState("Error"); }
                    if (vehicle == "") { error = error + "Please Enter Vehicle Number First\n\n"; this.getView().byId("VehicleNo").setValueState("Error"); }
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
                        // "BackendDataAvl": aTableData[D].BackendDataAvl,
                        "Sono": aTableData[D].SalesDocument,
                        "Zinvoice": aTableData[D].Invoice,
                        "Delievery": aTableData[D].DelivaryNumber,
                        "GateItem": aTableData[D].Item,
                        "Lifnr": aTableData[D].CustomerCode,
                        "Name1": aTableData[D].CustomerName,
                        "Matnr": aTableData[D].MaterialCode,
                        "OrderQty": aTableData[D].DelivaryQuantity,
                        "ZbagQty": aTableData[D].Package,
                        "Maktx": aTableData[D].MaterialDescription,
                        "Uom": aTableData[D].UOM,
                        "Remark": aTableData[D].Remarks,
                    })
                }
                var companycode = this.getView().getModel("oFirstScrennDataModel").getProperty("/CompanyCode");
                var num = "";
                if (companycode === "1000") {
                    num = "05"
                } else if (companycode === "2000") {
                    num = "12"
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
                            "Entrytime": this.getView().byId("ReportingTime").getValue() == "" || this.getView().byId("ReportingTime").getValue() == "0.00" ? null : ReportingTime1,
                            "VehicalNo": this.getView().byId("VehicleNo").getValue(),
                            "Challan": this.getView().byId("ChallanQty").getValue(),
                            "Container": this.getView().byId("ContainerNo").getValue(),
                            "Operator": this.getView().byId("OperatorName").getValue(),
                            "GateInDt": this.getView().byId("GateInDate").getValue() == "" || this.getView().byId("GateInDate").getValue() == "0.00" ? null : GateInDate2,
                            "GateInTm": this.getView().byId("GateInTime").getValue() == "" || this.getView().byId("GateInTime").getValue() == "0.00" ? null : GateIn_Time,
                            "GateOutDt": this.getView().byId("GateOutDate").getValue() == "" || this.getView().byId("GateOutDate").getValue() == "0.00" ? null : GateOutDate2,
                            "GateOutTm": this.getView().byId("GateOutTime").getValue() == "" || this.getView().byId("GateOutTime").getValue() == "0.00" ? null : GateOut_Time,
                            "LrDate": this.getView().byId("LRDate").getValue() == "" || this.getView().byId("LRDate").getValue() == "0.00" ? null : LRDate1,
                            "Vehiclercdate": this.getView().byId("VehicleRCDate").getValue() == "" || this.getView().byId("VehicleRCDate").getValue() == "0.00" ? null : VehicleRCDate2,
                            "Driverlicense": this.getView().byId("DriverLicenseExpiryDate").getValue() == "" || this.getView().byId("DriverLicenseExpiryDate").getValue() == "0.00" ? null : DriverLicenseExpiryDate2,
                            "LrNo": this.getView().byId("LRNumber").getValue(),
                            "Remark": this.getView().byId("Remark").getValue(),
                            "Name1": this.getView().byId("ModeofTransport").getValue(),
                            "TrOper": this.getView().byId("TransporterName").getValue(),
                            "Driver": this.getView().byId("DriverName").getValue(),
                            "Driverno": this.getView().byId("DriverMobileNo").getValue(),
                            "DrLisc": this.getView().byId("DriverLicenseNo").getValue(),
                            "Driveralcoholic": this.getView().byId("DriverAlcoholic").getSelectedIndex() === 0 ? "Yes" : "No",
                            "Flammablesubstance": this.getView().byId("FlammableSubstance").getSelectedIndex() === 0 ? "Yes" : "No",
                            "Firesafety": this.getView().byId("FireSafety").getSelectedIndex() === 0 ? "Yes" : "No",
                            "Reversehorn": this.getView().byId("ReverseHorn").getSelectedIndex() === 0 ? "Yes" : "No",
                            "Vehiclefitness": this.getView().byId("VehicleFitnessCertificate").getValue() == "" || this.getView().byId("VehicleFitnessCertificate").getValue() == "0.00" ? null : VehicleFitnessCertificate2,
                            "Vehicleinsurance": this.getView().byId("VehicleInsurance").getValue() == "" || this.getView().byId("VehicleInsurance").getValue() == "0.00" ? null : VehicleInsurance2,
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
                    "Entrytime": this.getView().byId("ReportingTime").getValue() == "" || this.getView().byId("ReportingTime").getValue() == "0.00" ? null : ReportingTime1,
                    "VehicalNo": this.getView().byId("VehicleNo").getValue(),
                    "Challan": this.getView().byId("ChallanQty").getValue(),
                    "Container": this.getView().byId("ContainerNo").getValue(),
                    "Operator": this.getView().byId("OperatorName").getValue(),
                    "GateInDt": this.getView().byId("GateInDate").getValue() == "" || this.getView().byId("GateInDate").getValue() == "0.00" ? null : GateInDate2,
                    "GateInTm": this.getView().byId("GateInTime").getValue() == "" || this.getView().byId("GateInTime").getValue() == "0.00" ? null : GateIn_Time,
                    "GateOutDt": this.getView().byId("GateOutDate").getValue() == "" || this.getView().byId("GateOutDate").getValue() == "0.00" ? null : GateOutDate2,
                    "GateOutTm": this.getView().byId("GateOutTime").getValue() == "" || this.getView().byId("GateOutTime").getValue() == "0.00" ? null : GateOut_Time,
                    "LrDate": this.getView().byId("LRDate").getValue() == "" || this.getView().byId("LRDate").getValue() == "0.00" ? null : LRDate1,
                    "Vehiclercdate": this.getView().byId("VehicleRCDate").getValue() == "" || this.getView().byId("VehicleRCDate").getValue() == "0.00" ? null : VehicleRCDate2,
                    "Driverlicense": this.getView().byId("DriverLicenseExpiryDate").getValue() == "" || this.getView().byId("DriverLicenseExpiryDate").getValue() == "0.00" ? null : DriverLicenseExpiryDate2,
                    "LrNo": this.getView().byId("LRNumber").getValue(),
                    "Remark": this.getView().byId("Remark").getValue(),
                    "Name1": this.getView().byId("ModeofTransport").getValue(),
                    "TrOper": this.getView().byId("TransporterName").getValue(),
                    "Driver": this.getView().byId("DriverName").getValue(),
                    "Driverno": this.getView().byId("DriverMobileNo").getValue(),
                    "DrLisc": this.getView().byId("DriverLicenseNo").getValue(),
                    "Driveralcoholic": this.getView().byId("DriverAlcoholic").getSelectedIndex() === 0 ? "Yes" : "No",
                    "Flammablesubstance": this.getView().byId("FlammableSubstance").getSelectedIndex() === 0 ? "Yes" : "No",
                    "Firesafety": this.getView().byId("FireSafety").getSelectedIndex() === 0 ? "Yes" : "No",
                    "Reversehorn": this.getView().byId("ReverseHorn").getSelectedIndex() === 0 ? "Yes" : "No",
                    "Vehiclefitness": this.getView().byId("VehicleFitnessCertificate").getValue() == "" || this.getView().byId("VehicleFitnessCertificate").getValue() == "0.00" ? null : VehicleFitnessCertificate2,
                    "Vehicleinsurance": this.getView().byId("VehicleInsurance").getValue() == "" || this.getView().byId("VehicleInsurance").getValue() == "0.00" ? null : VehicleInsurance2,
                    "Vehiclepuc": this.getView().byId("VehiclePUCNo").getValue(),
                    "GrossWt": (this.getView().byId("GrossWeight").getValue()).length === 0 ? "0.00" : this.getView().byId("GrossWeight").getValue(),
                    "TareWt": (this.getView().byId("TareWeight").getValue()).length === 0 ? "0.00" : this.getView().byId("TareWeight").getValue(),
                    "NetWt": (this.getView().byId("NetWaight").getValue()).length === 0 ? "0.00" : this.getView().byId("NetWaight").getValue(),
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
                            "Sono": item.SalesDocument,
                            "Zinvoice": item.Invoice,
                            "Delievery": item.DelivaryNumber,
                            "GateItem": item.Item,
                            "Lifnr": item.CustomerCode,
                            "Name1": item.CustomerName,
                            "Matnr": item.MaterialCode,
                            "OrderQty": item.DelivaryQuantity,
                            "ZbagQty": item.Package,
                            "Maktx": item.MaterialDescription,
                            "Uom": item.UOM,
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
            SaveGateEntryforGateOut: function () {
                var oBusy = new sap.m.BusyDialog({
                    text: "Please Wait"
                });
                oBusy.open();
                var gateEntryNumber = this.getView().byId("GateEntryNumber").getValue();
                const ReportingDate = new Date(this.getView().byId("ReportingDate").getValue());
                const ReportingDate1 = `${ReportingDate.getFullYear()}-${ReportingDate.getMonth() + 1 < 10 ? '0' : ''}${ReportingDate.getMonth() + 1}-${ReportingDate.getDate() < 10 ? '0' : ''}${ReportingDate.getDate()}`;
                const ReportingTime = this.getView().byId("ReportingTime").getValue();
                const [ReportingTime_hours, ReportingTime_minutes, ReportingTime_seconds] = ReportingTime.split(':').map(Number);
                const ReportingTime1 = `PT${ReportingTime_hours}H${ReportingTime_minutes}M${ReportingTime_seconds}S`;

                const GateOutTime_timeString = this.getView().byId("GateOutTime").getValue();
                const [GateOutTime_hours, GateOutTime_minutes, GateOutTime_seconds] = GateOutTime_timeString.split(':').map(Number);
                const GateOut_Time = `PT${GateOutTime_hours}H${GateOutTime_minutes}M${GateOutTime_seconds}S`;
                const GateOutDate = new Date(this.getView().byId("GateOutDate").getValue());
                const GateOutDate1 = `${GateOutDate.getFullYear()}-${GateOutDate.getMonth() + 1 < 10 ? '0' : ''}${GateOutDate.getMonth() + 1}-${GateOutDate.getDate() < 10 ? '0' : ''}${GateOutDate.getDate()}`;

                const LRDate = new Date(this.getView().byId("LRDate").getValue());
                const LRDate1 = `${LRDate.getFullYear()}-${LRDate.getMonth() + 1 < 10 ? '0' : ''}${LRDate.getMonth() + 1}-${LRDate.getDate() < 10 ? '0' : ''}${LRDate.getDate()}`;

                const DriverLicenseExpiryDate = new Date(this.getView().byId("DriverLicenseExpiryDate").getValue());
                const DriverLicenseExpiryDate1 = `${DriverLicenseExpiryDate.getFullYear()}-${DriverLicenseExpiryDate.getMonth() + 1 < 10 ? '0' : ''}${DriverLicenseExpiryDate.getMonth() + 1}-${DriverLicenseExpiryDate.getDate() < 10 ? '0' : ''}${DriverLicenseExpiryDate.getDate()}`;

                const VehicleRCDate = new Date(this.getView().byId("VehicleRCDate").getValue());
                const VehicleRCDate1 = `${VehicleRCDate.getFullYear()}-${VehicleRCDate.getMonth() + 1 < 10 ? '0' : ''}${VehicleRCDate.getMonth() + 1}-${VehicleRCDate.getDate() < 10 ? '0' : ''}${VehicleRCDate.getDate()}`;

                var oGateEntryHeaderData = {
                    "Gateno": this.getView().byId("GateEntryNumber").getValue(),
                    "EntryType": this.getView().byId("GateEntryType").getValue(),
                    "Plant": this.getView().byId("Plant").getValue(),
                    "Entrydate": this.getView().byId("ReportingDate").getValue() == "" || this.getView().byId("ReportingDate").getValue() == "0.00" ? "0.00" : ReportingDate1,
                    "Entrytime": this.getView().byId("ReportingTime").getValue() == "" || this.getView().byId("ReportingTime").getValue() == "0.00" ? "0.00" : ReportingTime1,
                    "VehicalNo": this.getView().byId("VehicleNo").getValue(),
                    "Challan": this.getView().byId("ChallanQty").getValue(),
                    "Container": this.getView().byId("ContainerNo").getValue(),
                    "Operator": this.getView().byId("OperatorName").getValue(),
                    "GateOutDt": this.getView().byId("GateOutDate").getValue() == "" || this.getView().byId("GateOutDate").getValue() == "0.00" ? "0.00" : GateOutDate1,
                    "GateOutTm": this.getView().byId("GateOutTime").getValue() == "" || this.getView().byId("GateOutTime").getValue() == "0.00" ? "0.00" : GateOut_Time,
                    "LrDate": this.getView().byId("LRDate").getValue() == "" || this.getView().byId("LRDate").getValue() == "0.00" ? "0.00" : LRDate1,
                    "Vehiclercdate": this.getView().byId("VehicleRCDate").getValue() == "" || this.getView().byId("VehicleRCDate").getValue() == "0.00" ? "0.00" : VehicleRCDate1,
                    "Driverlicense": this.getView().byId("DriverLicenseExpiryDate").getValue() == "" || this.getView().byId("DriverLicenseExpiryDate").getValue() == "0.00" ? "0.00" : DriverLicenseExpiryDate1,
                    "LrNo": this.getView().byId("LRNumber").getValue(),
                    "Remark": this.getView().byId("Remark").getValue(),
                    "Name1": this.getView().byId("ModeofTransport").getValue(),
                    "TrOper": this.getView().byId("TransporterName").getValue(),
                    "Driver": this.getView().byId("DriverName").getValue(),
                    "Driverno": this.getView().byId("DriverMobileNo").getValue(),
                    "DrLisc": this.getView().byId("DriverLicenseNo").getValue(),
                    "Driveralcoholic": this.getView().byId("DriverAlcoholic").getSelectedIndex() === 0 ? "Yes" : "No",
                    "Flammablesubstance": this.getView().byId("FlammableSubstance").getSelectedIndex() === 0 ? "Yes" : "No",
                    "Firesafety": this.getView().byId("FireSafety").getSelectedIndex() === 0 ? "Yes" : "No",
                    "Reversehorn": this.getView().byId("ReverseHorn").getSelectedIndex() === 0 ? "Yes" : "No",
                    "Vehiclefitness": this.getView().byId("VehicleFitnessCertificate").getValue(),
                    "Vehicleinsurance": this.getView().byId("VehicleInsurance").getValue(),
                    "Vehiclepuc": this.getView().byId("VehiclePUCNo").getValue(),
                    "GrossWt": (this.getView().byId("GrossWeight").getValue()).length === 0 ? "0.00" : this.getView().byId("GrossWeight").getValue(),
                    "TareWt": (this.getView().byId("TareWeight").getValue()).length === 0 ? "0.00" : this.getView().byId("TareWeight").getValue(),
                    "NetWt": (this.getView().byId("NetWaight").getValue()).length === 0 ? "0.00" : this.getView().byId("NetWaight").getValue(),
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
                            "Sono": item.SalesDocument,
                            "Zinvoice": item.Invoice,
                            "Delievery": item.DelivaryNumber,
                            "GateItem": item.Item,
                            "Lifnr": item.CustomerCode,
                            "Name1": item.CustomerName,
                            "Matnr": item.MaterialCode,
                            "OrderQty": item.DelivaryQuantity,
                            "ZbagQty": item.Package,
                            "Maktx": item.MaterialDescription,
                            "Uom": item.UOM,
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
            valueStatefor_VehicleNo: function (oEvent) {
                if (oEvent.mParameters.value) {
                    this.getView().byId("VehicleNo").setValueState("None");
                } else {
                    this.getView().byId("VehicleNo").setValueState("Error");
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
        });
    });
