export const turtleFileGenerator = ({
  firstName = "",
  lastName = "",
}) => `@prefix : <#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.

:me
    foaf:firstName "${firstName}";
    foaf:lastName "${lastName}".`;
