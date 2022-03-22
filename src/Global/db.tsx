// db.js
import Dexie, { Table } from 'dexie';

export interface TenderMesseges {
  id?: number;
  Tanderid?: number;
  ischecked: boolean;
}

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  tenderMesseges!: Table<TenderMesseges>; 

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      tenderMesseges: '++id,Tanderid, ischecked' // Primary key and indexed props
    }); 
   
  }
}

export const db = new MySubClassedDexie();

