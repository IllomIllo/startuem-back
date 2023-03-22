"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const PORT = process.env.PORT;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: true,
        credentials: true,
    });
    await app.listen(PORT, () => {
        console.log('Service listening on PORT =', PORT);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map