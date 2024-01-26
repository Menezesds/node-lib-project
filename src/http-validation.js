function extractLinks(arrayLinks) {
  return arrayLinks.map((linkObject) => Object.values(linkObject).join())
}

async function checkStatus(urlList) {
  const arrStatus = await Promise
    .all(
      urlList.map(async (url) => {
        try {
          const response = await fetch(url)
          return response.status;
        } catch (erro) {
          return erroHandling(erro);
        }
      })
    )
  return arrStatus;
}

function erroHandling(erro) {
  if (erro.cause.code === 'ENOTFOUND') {
    return 'link not found';
  } else {
    return 'Other error';
  }
}

export default async function validateLinkList(linkList) {
  const links = await extractLinks(linkList);
  const status = await checkStatus(links);

  return linkList.map((object, index) => ({
    ...object,
    status: status[index]
  }))
}