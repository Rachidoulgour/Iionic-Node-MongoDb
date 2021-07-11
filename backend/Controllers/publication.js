const path = require('path');
const fs = require('fs');
const fsx = require('fs-extra');
const moment = require('moment');
const mongoosePaginate = require ('mongoose-pagination');


const Publication = require('../models/publication');



async function savePublication(req, res){
    const params = req.body;
      
    if(!params.text) return res.status(200).send({message: 'necesitas enviar texto'});
    
    const publication = Publication();
    publication.title = params.title.toLowerCase();
    publication.author = params.author.toLowerCase();
    publication.text = params.text;
    publication.file = "null";
    publication.user = req.params.userId; 
    publication.created_at = moment().unix();
    
      

    publication.save((err, publicationSaved)=>{
        
        if(err){
            console.log(err)
            return res.status(500).send({message: 'Error al publicar la publication'})}
        if(!publicationSaved) return res.status(404).send({message: 'la publicacion no ha sido guardada'});
        publication.user.password = undefined;
        
        return res.status(200).send({publication: publicationSaved});
    })
}



async function uploadAvatar(req, res){
    try{
    const publicationId = req.params.id
   
    if(req.files){
        const file_path=req.files.image.path;
        
        const file_split = file_path.split('\\');
        
        const file_name = file_split[2];
        const ext_split = file_name.split('\.');
        const file_ext =ext_split[1]
        
        if(file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'png' || file_ext == 'gif'){
            
            
            Publication.findOne({'user':req.user._id, '_id':publicationId}).exec((err, publication)=>{
                if(publication){
                    Publication.findByIdAndUpdate(publicationId, {file: file_name}, {new:true}, (err, publicationUpdated)=>{
                        if(err) return res.status(500).send({
                            message: 'error en la peticion'
                        })
                        if(!publicationUpdated) return res.status(404).send({
                            message: 'No se ha podido actualizar'
                        })
                        fsx.unlink(file_path);
                        return res.status(200).send({publication: publicationUpdated})
                    })
                }else{
                    return removeUploadsFiles(res, file_path, 'no tienes permiso para actualizar')
                }
            })
        }else{
            return removeUploadsFiles(res, file_path, 'extencion no valida')
        }
    }else{
        return res.status(200).send({message: 'no se ha subido la photo'})
    }
}catch(err){
    console.log(err)
}
}

function removeUploadsFiles(res, file_path, message){
    fs.unlink(file_path, (err)=>{
        return res.status(200).send({message: message})
    })
}

function getAvatarFile(req, res){
    const avatar_file = req.params.avatarFile;
    
    const path_file = '../uploads'+avatar_file;
    fs.exists(path_file, (exists)=>{
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'No existe la imagen del avatar'});
        }
    })
}
function getPublications(req, res){
    console.log(req.params.page)
    if(req.params.page){
        page= +req.params.page;        
    }
    const itemsPerPage = 10;
        Publication.find({is_eliminated: false}).sort('-created_at').populate('user').paginate(page, itemsPerPage, (err, publications, total)=>{
            if(err) return res.status(500).send({message: 'error de recibir publicaciones'});
            if(!publications) return res.status(404).send({message: 'no hay publicaciones'});
            publications.forEach(function(publication){
                publication.user.password = undefined;
            })
            
            return res.status(200).send({
                total_items: total,
                pages: Math.ceil(total/itemsPerPage),
                page: page,
                items_per_page: itemsPerPage,
                publications
            })
        })
    }
    
//}

module.exports = {
    savePublication,
    uploadAvatar,
    getAvatarFile,
    getPublications
}
