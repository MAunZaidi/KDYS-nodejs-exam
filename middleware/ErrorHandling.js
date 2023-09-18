const ErrorHandler = (error,req, res, next) =>{
    console.log(error);
    const defaulterror = {
        status:500,
        message: error
    }
    if(error==="ValidationError"){
        defaulterror.status = 400
        defaulterror.message = Object.values(error.errors).map(items=>items.message).join(',')
    }
    res.status(defaulterror.status).json({message: defaulterror.message})

};

export default ErrorHandler;