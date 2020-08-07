import { Component, OnInit, ViewChild, TemplateRef, ElementRef, OnDestroy } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import Peer from 'peerjs';
import DataConnection from 'peerjs';
import { Template } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  uuidv4: any;
  peer: Peer;
  connection: Peer.DataConnection;
  i = 0;

  @ViewChild('idInput') idInputRef: ElementRef;

  ngOnDestroy() {
    if (this.connection) { this.connection.close(); }
  }

  ngOnInit(): void {
    this.uuidv4 = uuidv4();

    this.peer = new Peer(this.uuidv4);

    this.peer.on('open', (cId) => {
      console.log('peer open => ' + cId);
    });

    this.peer.on('connection', (c) => {
      console.log(c);
      this.connection = c;
      // Disallow incoming connections
      this.connection.on('open', () => {
        console.log('Connection opened!');
        this.connection.send('Hi from PC!');
      });

      this.connection.on('data', (data) => {
        console.log('Data => ' + data);
      });

      this.connection.on('close', () => {
        console.log('Connection closed');
      });

      this.connection.on('error', (er) => {
        console.log(er);
      });
    });

    this.peer.on('disconnected', () => {
      console.log('Connection lost. Please reconnect');

      // Workaround for this.peer.reconnect deleting previous id
      // this.peer.id = this.lastPeerId;
      // this.peer._lastServerId = this.lastPeerId;
      // this.peer.reconnect();
    });

    this.peer.on('close', () =>  {
        this.connection = null;
        console.log('Connection destroyed');
    });

    this.peer.on('error', (err) => console.log(err));
  }

  connect() {
    if (this.connection) {
      this.connection.close();
    }

    this.peer.connect(this.idInputRef.nativeElement.value);

    // this.conn2.on('open', () => {
    //   console.log('OPEND');
    //   this.conn2.send("con2 Mes2");
    // });

    // this.conn2.on('data', (data) => {
    //   console.log('Data' + data);
    // });

    // this.conn2.on('close', () => {
    //   console.log('Close');
    // });

    // this.conn2.on('error', (er) => {
    //   console.log(er);
    // });
  }


  send() {
    this.connection.send(`Test message [${this.i++}]`);
  }

}
