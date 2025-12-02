import view from '@fastify/view';
import objectionPlugin from './lib/objection.js';
import pug from 'pug';
import Fastify from 'fastify'; // Fastify v4+
import fastifyFormbody from '@fastify/formbody';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/index.js';
import knex from 'knex';
import knexConfig from '../knexfile.js';
import { Model } from 'objection';
/*
import { Strategy as LocalStrategy } from 'passport-local';

import User from './models/User.cjs';



import dotenv from 'dotenv';
