import React from 'react'
import { HomeHeading, HomePageContainer, HomeParagraph } from '../components/StyledComponent'

export default function HomePage() {
  return (
    <HomePageContainer>
      <HomeHeading>Welcome to the Home Page!</HomeHeading>
      <HomeParagraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis justo sit amet ligula bibendum dapibus.
        Vestibulum vel justo sed velit maximus cursus. Duis condimentum justo in neque faucibus, at maximus felis
        fermentum.
      </HomeParagraph>
      <HomeParagraph>
        Nunc ultrices odio a hendrerit posuere. Integer cursus diam non dolor ultrices, a tincidunt ligula
        bibendum. Nulla facilisi. Proin non odio eu metus tristique facilisis vitae id leo.
      </HomeParagraph>
    </HomePageContainer>
  )
}
