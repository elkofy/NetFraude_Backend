import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'


const typeDefs = `#graphql
    type Movie{
        title : String
        genre : String
        duree : Float
        cover : String
    }

    type Query{
        movies: [Movie]
    }
`

const resolvers ={
    Query: {movies(){
        return[
        {
            title: 'Une pisse',
            duration: '1h30',
            genre: 'Figé',
            poster: 'https://static.wikia.nocookie.net/onepiece/images/a/aa/Volume_77.png'
        },
        {
            title: 'Dragon Boule à Z',
            duration: '1h30',
            genre: 'Figé',
            poster:
                'https://ih1.redbubble.net/image.1062591670.5646/mwo,x1000,ipad_2_snap-pad,750x1000,f8f8f8.jpg'
        },
        {
            title: 'Gunter x Gunter',
            duration: '1h30',
            genre: 'Figé',
            poster: 'https://fr.web.img5.acsta.net/pictures/19/08/01/09/52/4803203.jpg'
        }
    ]
    }}

}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})


const {url} = await startStandaloneServer(server,{
    listen: { port:8000},
})

console.log(`Le serveur tourne sur : ${url}`)