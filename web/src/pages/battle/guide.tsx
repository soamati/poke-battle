import React from "react";
import Li from "@/components/Li";
import Ul from "@/components/Ul";
import Ol from "@/components/Ol";
import Page from "@/layout/Page";
import { Heading, Stack, Tag, Text } from "@chakra-ui/react";
import {
  Attacker,
  Defender,
  Attack,
  Defense,
  Health,
} from "@/components/Legend";
import withAuthGSSP from "@/lib/withAuthGSSP";

export const getServerSideProps = withAuthGSSP();

const BattleGuide = () => {
  return (
    <Page>
      <Stack pt={2} spacing={6}>
        <Heading textAlign="center" size="md">
          Guía de Batalla
        </Heading>
        <Heading textAlign="center" size="sm">
          Consulta la mecánica del juego
        </Heading>

        <Stack spacing={4}>
          <Heading size="sm">1. Batalla por turnos</Heading>

          <Text>
            La batalla se lleva a cabo a través de un sistema de turnos. En cada
            turno, el jugador puede tener el rol de <Attacker /> o <Defender />.
          </Text>

          <Text>
            Al final de cada turno, el <Attacker /> utilizará su estadística de{" "}
            <Attack /> para hacer daño a la estadística <Defense /> del{" "}
            <Defender />, el resultado puede ser:
          </Text>

          <Ol type="a" pl="8">
            <Li mb="2">
              Si <Attack /> es mayor que <Defense />, se le resta la diferencia
              a la salud <Health /> del Pokémon <Defender />
            </Li>
            <Li>
              Si <Attack /> es menor que <Defense />, se le resta la diferencia
              a la salud <Health /> del Pokémon <Attacker />
            </Li>
          </Ol>
        </Stack>

        <Stack spacing={4}>
          <Heading size="sm">2. Ruleta de batalla</Heading>

          <Text>
            Antes de que se realicen las comparaciones entre <Attack /> y{" "}
            <Defense /> correspondientes a cada turno, se aplican las
            bonificaciones indicadas por el resultado de la Ruleta de Batalla,
            potenciando las estadísticas del Pokémon ganador de la ruleta, según
            el item que ha sido sorteado.
          </Text>

          <Text>A tener en cuenta:</Text>

          <Ul pl="8">
            <Li>
              Cuando el jugador agrega un item a la ruleta, el rival también
              agrega un item, el cual es seleccionado al azar de entre los items
              del jugador
            </Li>
            <Li>
              Si el jugador gana la ruleta, el item se consume de su inventario
            </Li>
            <Li>
              Si el rival gana la ruleta, el item sorteado no se consume del
              inventario del jugador
            </Li>
            <Li>No es necesario agregar items a la ruleta</Li>
          </Ul>
        </Stack>

        <Stack spacing={4}>
          <Heading size="sm">3. Condiciones de victoria</Heading>

          <Text>
            Gana el primer Pokémon que vacíe la barra de salud <Health /> de su
            rival.
          </Text>
        </Stack>

        <Stack spacing={4}>
          <Heading size="sm">4. Recompensas</Heading>

          <Text>Al ganar una batalla:</Text>

          <Ul pl="8">
            <Li>
              El jugador captura al Pokémon rival y pasa a estar disponible en
              su Pokédex para ser seleccionado en batallas futuras
            </Li>
            <Li>
              El jugador adquiere <Tag colorScheme="yellow">500 Pokécoins</Tag>{" "}
              para ser utilizados en la tienda
            </Li>
          </Ul>

          <Text>Al perder una batalla:</Text>

          <Ul pl="8">
            <Li>
              El jugador pierde el Pokémon seleccionado y ya no estará
              disponible en su Pokédex
            </Li>
          </Ul>
        </Stack>
      </Stack>
    </Page>
  );
};

export default BattleGuide;
