import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import Peer from 'peerjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TestWebRTC';

  ngOnInit(): void {
    const guid = uuidv4();
    const per = new Peer(guid);
  }

}
