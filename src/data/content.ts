import {getCollection} from 'astro:content';
export const source='';
export const published=(r:any)=>r.data.status==='published';
export async function loadArtists(){
 const works=(await getCollection('artworks')).filter(published).map(x=>x.data);
 return (await getCollection('artists')).filter(published).filter(({data:a})=>a.directoryStatus!=='unlisted').map(({data:a})=>{
 const related=works.filter(w=>w.artist===a.slug||a.artworks.includes(w.slug));
 const images=[...a.images,...related.filter(w=>!a.images.some(i=>i.localPath===w.image)).map(w=>({localPath:w.image,alt:w.alt,caption:w.caption||w.title}))];
 return {...a,images,related,name:a.title,bio:a.paragraphs.join('\n\n'),source:a.sourceUrl,image:images[0]?.localPath??null,alt:images[0]?.alt||`Image from ${a.title}’s profile`,work:images[0]?.caption||'',medium:''};
 }).sort((a,b)=>a.name.localeCompare(b.name));
}
export async function loadNews(){return (await getCollection('news')).filter(published).map(({data:n})=>({...n,date:new Date((n.publishedAt||'1970-01-01').slice(0,10)+'T12:00:00Z').toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric',timeZone:'UTC'}),text:n.excerpt||n.paragraphs[0]||'',href:`/news/${n.slug}/`})).sort((a,b)=>(b.publishedAt??'').localeCompare(a.publishedAt??''));}
export async function loadPage(slug:string){const page=(await getCollection('pages')).find(p=>p.data.slug===slug&&published(p));if(!page)throw new Error(`Missing published page: ${slug}`);return page.data;}
export async function loadEvents(){return (await getCollection('events')).filter(published).map(e=>e.data).filter(e=>e.scheduleQuality!=='needs-review'&&!e.issues.length).sort((a,b)=>a.start.localeCompare(b.start));}
export async function loadSettings(){return (await getCollection('settings')).find(x=>x.id==='site')!.data;}

export async function loadArtistProfiles(){const current=await loadArtists();const archived=(await getCollection('artists')).filter(x=>x.data.status==='archived').map(({data:a})=>({...a,name:a.title,related:[],source:a.sourceUrl}));return [...current,...archived];}
