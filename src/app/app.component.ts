import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import Peer from 'peerjs';
import { Template } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  id: any;
  peer: Peer = null;
  conn2: any;
  otherId: any;

  @ViewChild('idInput') idInputRef: ElementRef;

  ngOnInit(): void {
    this.id = uuidv4();
    this.peer = new Peer(this.id);

    this.peer.on('connection', (conn) => {
      conn.on('data', (data) => {
        console.log(data);
      });
      conn.on('open', () => {
        conn.send('hello!');
      });
    });
  }

  connect() {
    this.conn2 = this.peer.connect(this.idInputRef.nativeElement.value);
  }

}
