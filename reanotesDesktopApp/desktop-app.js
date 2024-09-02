"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_disk_info_1 = require("node-disk-info");
var path = require("path");
var fs = require("node:fs");
var data_extractor_1 = require("./data-extractor");
// Global variables
var kindleDrivePath = ''; // This will hold the path to the Kindle drive if found
var kindleNotes = ''; // Path to Kindle notes if found
// detect all connected drivers
function detectKindleDrive() {
    return __awaiter(this, void 0, void 0, function () {
        var disks, _i, disks_1, disk, kindleDirectory, clippingsPath, reason_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, node_disk_info_1.getDiskInfo)()];
                case 1:
                    disks = _a.sent();
                    for (_i = 0, disks_1 = disks; _i < disks_1.length; _i++) {
                        disk = disks_1[_i];
                        if (disk.filesystem.includes('Removable')) {
                            kindleDirectory = path.join(disk.mounted, 'documents');
                            // checking if the documents folder exists
                            if (fs.existsSync(kindleDirectory)) {
                                clippingsPath = path.join(kindleDirectory, 'My Clippings.txt');
                                if (fs.existsSync(clippingsPath)) {
                                    return [2 /*return*/, kindleDirectory];
                                }
                            }
                        }
                    }
                    return [3 /*break*/, 3];
                case 2:
                    reason_1 = _a.sent();
                    throw new Error("Undetectable Kindle (no kindle has been detected): ".concat(reason_1.message));
                case 3: return [2 /*return*/, null];
            }
        });
    });
}
// to find kindle notes
function findKindleNotes(kindleDirectory) {
    return __awaiter(this, void 0, void 0, function () {
        var filePath, data, reason_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    filePath = path.join(kindleDirectory, 'My Clippings.txt');
                    return [4 /*yield*/, fs.promises.readFile(filePath, 'utf8')];
                case 1:
                    data = _a.sent();
                    if (data) {
                        return [2 /*return*/, data];
                    }
                    return [2 /*return*/, null];
                case 2:
                    reason_2 = _a.sent();
                    throw new Error("Kindle notes is not found: (".concat(reason_2.message, ")"));
                case 3: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var kindleDirectory, clippings;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, detectKindleDrive()];
                case 1:
                    kindleDirectory = _a.sent();
                    if (!kindleDirectory) return [3 /*break*/, 3];
                    return [4 /*yield*/, findKindleNotes(kindleDirectory)];
                case 2:
                    clippings = _a.sent();
                    console.log((0, data_extractor_1.default)(clippings));
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
main(); // Start the process
