import { PartialType } from "@nestjs/mapped-types";
import { Guest } from "../entities/guest.entity";

export class UpdateGuestDto extends PartialType(Guest){
    
}