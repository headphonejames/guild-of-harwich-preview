import fs from 'node:fs';import {DateTime} from 'luxon';import assert from 'node:assert/strict';import {editorSchemas} from '../src/data/editor-schemas.mjs';
const all={};
for(const [name,schema] of Object.entries(editorSchemas)){assert(fs.existsSync(`content/${name}`),`Missing collection ${name}`);all[name]=fs.readdirSync(`content/${name}`).filter(x=>x.endsWith('.json')).map(file=>{const d=schema.parse(JSON.parse(fs.readFileSync(`content/${name}/${file}`,'utf8')));if(name!=='settings')assert.equal(file,d.slug+'.json','Permanent slug must match file ID');return d;});}
const has=(c,id)=>all[c].some(r=>r.slug===id);
for(const a of all.artworks){assert(has('artists',a.artist),`Unknown artist ${a.artist}`);assert(fs.existsSync('public'+a.image),'Missing artwork asset');}
for(const a of all.artists){for(const id of a.artworks){assert(has('artworks',id),`Unknown artwork ${id}`);assert.equal(all.artworks.find(w=>w.slug===id).artist,a.slug,'Artwork artist attribution mismatch');}for(const i of a.images)assert(fs.existsSync('public'+i.localPath),'Missing profile asset');}
for(const e of all.events){if(e.program)assert(has('programs',e.program),`Unknown program ${e.program}`);if(e.status==='published'){assert.notEqual(e.scheduleQuality,'needs-review','Published event requires reviewed schedule');assert.equal(e.issues.length,0,'Resolve issues before publishing');}for(const value of [e.start,e.end]){const d=DateTime.fromISO(value,{zone:e.timezone});assert(d.isValid&&d.toFormat("yyyy-MM-dd'T'HH:mm:ss")===value.padEnd(19,':00'),'Invalid or skipped local calendar time');}}
console.log(JSON.stringify({collections:Object.fromEntries(Object.entries(all).map(([k,v])=>[k,v.length])),publishableEvents:all.events.filter(e=>e.status==='published').length},null,2));

const provenance=JSON.parse(fs.readFileSync('content/provenance.json','utf8'));
for(const records of Object.values(all))for(const r of records){if(!r.provenanceId)continue;const p=provenance[r.provenanceId];assert(p,'Unknown provenance ID');assert.equal(r.sourceUrl,p.sourceUrl,'Source URL is immutable evidence');assert.equal(r.sourceFetchedAt,p.sourceFetchedAt,'Source fetch date is immutable evidence');assert(p.sourceIds.includes(r.sourceId)||(!p.sourceIds.length&&r.sourceId===r.provenanceId),'Source identity is immutable evidence');}
for(const r of all.resources)if(r.file.startsWith('/media/'))assert(fs.existsSync('public'+r.file),'Missing download file');

const bindings=JSON.parse(fs.readFileSync('content/provenance-bindings.json','utf8'));for(const [collection,records] of Object.entries(all))for(const r of records){const expected=bindings[collection+'/'+r.slug];if(expected)assert.equal(r.provenanceId,expected,'Imported provenance binding cannot be removed or replaced');}
