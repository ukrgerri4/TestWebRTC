import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import Peer from 'peerjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  id: any;

  ngOnInit(): void {
    this.id = uuidv4();
    const peer = new Peer(this.id);

    peer.on('connection', (conn) => {
      conn.on('data', (data) => {
        console.log(data);
      });
      conn.on('open', () => {
        conn.send('hello!');
      });
    });
  }

}
