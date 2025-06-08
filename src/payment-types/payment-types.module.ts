import { Module } from "@nestjs/common";
import { PaymentTypesService } from "./payment-types.service";
import { PaymentTypesController } from "./payment-types.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentType } from "./entities/payment-type.entity";
import { PaymentTypesResolver } from "./payment-types.resolver";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([PaymentType]), JwtModule],
  controllers: [PaymentTypesController],
  providers: [PaymentTypesService, PaymentTypesResolver],
  exports: [PaymentTypesService],
})
export class PaymentTypesModule {}
