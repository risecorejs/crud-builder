"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./templates/create"), exports);
__exportStar(require("./templates/index"), exports);
__exportStar(require("./templates/show"), exports);
__exportStar(require("./templates/count"), exports);
__exportStar(require("./templates/update"), exports);
__exportStar(require("./templates/bulk-update"), exports);
__exportStar(require("./templates/destroy"), exports);
__exportStar(require("./templates/bulk-destroy"), exports);
__exportStar(require("./templates/restore"), exports);
__exportStar(require("./templates/bulk-restore"), exports);
