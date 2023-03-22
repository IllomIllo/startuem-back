"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const common_1 = require("@nestjs/common");
const roles_constants_1 = require("../roles.constants");
const Roles = (...roles) => (0, common_1.SetMetadata)(roles_constants_1.ROLES_KEY, roles);
exports.Roles = Roles;
//# sourceMappingURL=roles-auth.decorator.js.map