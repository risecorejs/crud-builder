"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = __importDefault(require("./create"));
const index_1 = __importDefault(require("./index"));
const show_1 = __importDefault(require("./show"));
const count_1 = __importDefault(require("./count"));
const update_1 = __importDefault(require("./update"));
const bulk_update_1 = __importDefault(require("./bulk-update"));
const destroy_1 = __importDefault(require("./destroy"));
const bulk_destroy_1 = __importDefault(require("./bulk-destroy"));
const restore_1 = __importDefault(require("./restore"));
const bulk_restore_1 = __importDefault(require("./bulk-restore"));
exports.default = {
    create: create_1.default,
    index: index_1.default,
    show: show_1.default,
    count: count_1.default,
    update: update_1.default,
    bulkUpdate: bulk_update_1.default,
    destroy: destroy_1.default,
    bulkDestroy: bulk_destroy_1.default,
    restore: restore_1.default,
    bulkRestore: bulk_restore_1.default
};
