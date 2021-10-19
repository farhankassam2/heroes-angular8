import { Component, OnInit } from "@angular/core";
import { MessageService } from "../message.service";

@Component({
    selector   : "app-messages",
    templateUrl: "./messages.component.html",
    styleUrls  : ["./messages.component.css"]
})
export class MessagesComponent {

    /*
     * below messageService is made public because Angular only binds to public component properties
     * and we need to bind messageService into the HTML template.
     */
    constructor(messageService: MessageService) {}

}
