import { Duplex, Readable, Writable, Stream } from 'streamx';

export = class Composer extends Duplex {

  constructor(options?: DuplexOptions);

  static pipeline(...streams: Stream<TByteType, true, true>[]): Composer;

  static duplexer(ws?: Writable, rs?: Readable): Composer;

  setPipeline(first: Readable, ...streams: Readable[]): this;

  setReadable(rs: Readable): this;

  setWritable(ws: Writable): this;

};
