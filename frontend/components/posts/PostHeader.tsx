import { HeaderMain } from "./HeaderMain";
import styles from '../../styles/Post.module.scss';
import { HeaderOptions } from "./HeaderOptions";
import { Flex } from "../Flex";

export const PostHeader = () => {
    return(
        <Flex className={styles['header']} justifyContent={'space-between'}>
            <HeaderMain />
            <HeaderOptions />
        </Flex>
    )
}