import {defineCollection} from 'astro:content';
import {glob} from 'astro/loaders';
import {editorSchemas} from './data/editor-schemas.mjs';
export const collections={
 resources:defineCollection({loader:glob({pattern:'*.json',base:'./content/resources'}),schema:editorSchemas.resources}),
 archive:defineCollection({loader:glob({pattern:'*.json',base:'./content/archive'}),schema:editorSchemas.archive}),
 artists:defineCollection({loader:glob({pattern:'*.json',base:'./content/artists'}),schema:editorSchemas.artists}),
 artworks:defineCollection({loader:glob({pattern:'*.json',base:'./content/artworks'}),schema:editorSchemas.artworks}),
 news:defineCollection({loader:glob({pattern:'*.json',base:'./content/news'}),schema:editorSchemas.news}),
 pages:defineCollection({loader:glob({pattern:'*.json',base:'./content/pages'}),schema:editorSchemas.pages}),
 programs:defineCollection({loader:glob({pattern:'*.json',base:'./content/programs'}),schema:editorSchemas.programs}),
 events:defineCollection({loader:glob({pattern:'*.json',base:'./content/events'}),schema:editorSchemas.events}),
 settings:defineCollection({loader:glob({pattern:'*.json',base:'./content/settings'}),schema:editorSchemas.settings}),
};
