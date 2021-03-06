import asyncBusboy from 'async-busboy'

export default function graphqlKoaUpload(options) {

  function isUpload(ctx) {
    return Boolean(
      ctx.path === options.endpointURL &&
      ctx.request.method === 'POST' &&
      ctx.request.is('multipart/*')
    )
  }

  return async function(ctx, next) {
    if (!isUpload(ctx)) return next()
    const { files, fields } = await asyncBusboy(ctx.req)
    const { operationName, query } = fields
    const variables = JSON.parse(fields.variables)
    // append files to variables
    files.forEach(file => {
      if (!variables[file.fieldname]) {
        variables[file.fieldname] = []
      }
      variables[file.fieldname].push(file)
    })
    ctx.request.body = {
      operationName,
      query,
      variables,
    }
    return next()
  }
}
