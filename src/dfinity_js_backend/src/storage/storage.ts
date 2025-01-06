import { StableBTreeMap } from "azle/experimental";
import { Conversation } from "../dataType/dataType";



export const userConversation = StableBTreeMap<string, Conversation>(0);