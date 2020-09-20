import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";

@InputType()
export class createAnswerInput{
    @Field()
    issueId: string

    @Field()
    @Length(1, 2000)
    answer:string
}
@InputType()
export class updateAnswer{
    @Field()
    answer:string
    @Field()
    answerId:string
}
