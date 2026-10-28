import {z} from 'astro/zod';
const text=z.string().default('');
export const common={bodyHtml:text,provenanceId:text,title:z.string().min(1),slug:z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),status:z.enum(['draft','review','published','archived']).default('draft'),paragraphs:z.array(z.string()).default([]),excerpt:text,seoTitle:text,seoDescription:text,sourceId:text,sourceUrl:text,sourceFetchedAt:text};
const local=z.string().regex(/^\/media\/[A-Za-z0-9_./-]+$/).refine(x=>!x.includes('..'),'No parent paths');
export const editorSchemas={
 resources:z.object({...common,file:z.string().startsWith('/'),mimeType:text,description:text}),
 archive:z.object({...common,kind:z.string(),originalTitle:text,originalPublishedAt:text,sourceIds:z.array(z.string()),wpIds:z.array(z.number()),primaryPath:text,qualification:text,issues:z.array(z.string()),functionalGaps:z.array(z.looseObject({type:z.string()}))}),
 artists:z.object({...common,directoryStatus:z.enum(['listed-in-source','confirmed','unlisted']).default('unlisted'),membershipEvidence:text,images:z.array(z.object({localPath:local,alt:text,caption:text})).default([]),artworks:z.array(z.string()).default([])}),
 artworks:z.object({...common,artist:z.string().min(1),image:local,alt:z.string().min(1),caption:text,medium:text,dimensions:text,copyright:text}),
 news:z.object({...common,publishedAt:text}),
 pages:z.object(common),programs:z.object(common),
 events:z.object({...common,start:z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/),end:z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/),timezone:z.string().refine(x=>{try{new Intl.DateTimeFormat('en',{timeZone:x});return true}catch{return false}},'Use an IANA timezone'),allDay:z.boolean().default(false),venue:text,cost:text,scheduleQuality:z.enum(['needs-review','source-consistent','confirmed']).default('needs-review'),issues:z.array(z.string()).default([]),program:text,series:text,recurrenceNote:text}).refine(e=>e.end>=e.start,'End must follow start'),
 settings:z.object({title:z.string(),introduction:z.array(z.string()),navigation:z.array(z.object({label:z.string(),path:z.string().startsWith('/')})),address:z.string(),phone:z.string(),email:z.email()})
};
