const express=require('express');const app=express();app.get('/api/health',(req,res)=>res.json({message:'OK'}));app.listen(3001,()=>console.log('Server OK'));
