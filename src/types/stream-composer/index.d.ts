import { Duplex, Readable, Writable, Stream } from 'streamx';
// import GulpFile from 'vinyl';

export = class Composer extends Duplex {

  constructor(opts?: DuplexOptions);

  static pipeline(...streams: Stream<TByteType, true, true>[]): Composer;

  static duplexer(ws?: Writable = null, rs?: Readable = null): Composer;

  setPipeline(first: Readable, ...streams: Readable[]): this;

  setReadable(rs: Readable): this;

  setWritable(ws: Writable): this;

};
