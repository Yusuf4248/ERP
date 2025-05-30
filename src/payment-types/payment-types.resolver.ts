import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { PaymentTypesService } from "./payment-types.service";
import { PaymentType } from "./entities/payment-type.entity";
import { CreatePaymentTypeDto } from "./dto/create-payment-type.dto";
import { UpdatePaymentTypeDto } from "./dto/update-payment-type.dto";

@Resolver(() => PaymentType)
export class PaymentTypesResolver {
  constructor(private readonly paymentTypesService: PaymentTypesService) {}

  @Mutation(() => PaymentType)
  createPaymentType(
    @Args("createPaymentTypeDto") createPaymentTypeDto: CreatePaymentTypeDto
  ) {
    return this.paymentTypesService.create(createPaymentTypeDto);
  }

  @Query(() => [PaymentType], { name: "paymentTypes" })
  findAll() {
    return this.paymentTypesService.findAll();
  }

  @Query(() => PaymentType, { name: "paymentType" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.paymentTypesService.findOne(id);
  }

  @Mutation(() => PaymentType)
  updatePaymentType(
    @Args("id", { type: () => Int }) id: number,
    @Args("updatePaymentTypeDto") updatePaymentTypeDto: UpdatePaymentTypeDto
  ) {
    return this.paymentTypesService.update(id, updatePaymentTypeDto);
  }

  @Mutation(() => PaymentType)
  removePaymentType(@Args("id", { type: () => Int }) id: number) {
    return this.paymentTypesService.remove(id);
  }
}
