import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { MediaService } from "./media.service";
import { Media } from "./entities/media.entity";
import { CreateMediaDto } from "./dto/create-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";

@Resolver(() => Media)
export class MediaResolver {
  constructor(private readonly mediaService: MediaService) {}

  @Mutation(() => Media)
  createMedia(@Args("createMediaInput") createMediaDto: CreateMediaDto) {
    return this.mediaService.create(createMediaDto);
  }

  @Query(() => [Media], { name: "media" })
  findAll() {
    return this.mediaService.findAll();
  }

  @Query(() => Media, { name: "mediaById" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.mediaService.findOne(id);
  }

  @Mutation(() => Media)
  updateMedia(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateMediaInput") updateMediaDto: UpdateMediaDto
  ) {
    return this.mediaService.update(id, updateMediaDto);
  }

  @Mutation(() => Media)
  removeMedia(@Args("id", { type: () => Int }) id: number) {
    return this.mediaService.remove(id);
  }
}
