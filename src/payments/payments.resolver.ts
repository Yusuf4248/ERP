import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { PaymentsService } from "./payments.service";
import { Payment } from "./entities/payment.entity";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";

@Resolver(() => Payment)
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Mutation(() => Payment)
  createPayment(@Args("createPaymentDto") createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Query(() => [Payment], { name: "payments" })
  findAll() {
    return this.paymentsService.findAll();
  }

  @Query(() => Payment, { name: "payment" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.paymentsService.findOne(id);
  }

  @Mutation(() => Payment)
  updatePayment(
    @Args("id", { type: () => Int }) id: number,
    @Args("updatePaymentDto") updatePaymentDto: UpdatePaymentDto
  ) {
    return this.paymentsService.update(id, updatePaymentDto);
  }

  @Mutation(() => Payment)
  removePayment(@Args("id", { type: () => Int }) id: number) {
    return this.paymentsService.remove(id);
  }
}
