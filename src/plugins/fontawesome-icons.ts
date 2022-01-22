import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons";
import {
  faBook,
  faClipboardList,
  faComment,
  faComments,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faGithubSquare);
library.add(faSearch);
library.add(faBook);
library.add(faComment);
library.add(faComments);
library.add(faClipboardList);

export default FontAwesomeIcon;
