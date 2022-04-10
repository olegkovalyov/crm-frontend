import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  // console.log((req.page));
  // console.log('trigger middleware: ', req.cookies);
  NextResponse.next();
}