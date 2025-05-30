import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";

async function start() {
  try {
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      })
    );
    app.setGlobalPrefix("api");
    app.enableCors({
      origin: (origin, callback) => {
        const allowedOrigin = [
          "http://localhost:6969",
          "http://localhost:8000",
          "http://erp.uz",
          "http://api.erp.uz",
          "http://erp.versel.app",
        ];
        if (!origin || allowedOrigin.includes(origin)) {
          callback(null, true);
        } else {
          callback(new BadRequestException("Not allowed by CORS"));
        }
      },
      methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
      credentials: true,
    });
    const config = new DocumentBuilder()
      .setTitle("ERP PROJECT")
      .setDescription("ERP-REST-API")
      .setVersion("1.0")
      .addTag("NESTJS", "Validation, SWAGGER, BOT, TOEKNS, SENDMAIL")
      .addTag("Nest js", "GUARD, AUTH")
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);
    await app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
