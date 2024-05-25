import {db} from "../db/db";
import {InsertMedia, mediaTable} from "../db/schema";

export class MediaService{
    async createMedia(data: InsertMedia){
        await db.insert(mediaTable).values(data)
    }
}