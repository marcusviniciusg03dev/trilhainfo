import { CheckIcon } from "@chakra-ui/icons";
import { FaRegCircle } from "react-icons/fa";
import { Level, RoadmapItem } from "../../entity/RoadmapModel";
import ReactGA from "react-ga4";

type Props = {
  level: Level;
  index: number;
  levelsQty: number;
  setActiveItem: (item: RoadmapItem) => void;
  onOpen: () => void;
  isAllContentRead: (label: string, contentLength: number) => boolean;
  checkAllContent: (label: string, check: boolean) => void;
};

export default function LevelItem(props: Props) {
  function triggerItemSelection(item: RoadmapItem) {
    props.setActiveItem(item);
    window.history.pushState(
      item.label,
      item.label,
      `#${encodeURI(item.label)}`
    );
    ReactGA.event({
      category: "item_open",
      action: "open_" + item.label,
    });
    props.onOpen();
  }

  return (
    <article className="flex flex-col">
      <div
        className={
          props.level.label
            ? " self-center rounded-md border-2 border-dotted border-dark-red bg-light-yellow p-4 pb-5 lg:w-2/3"
            : ""
        }
      >
        {props.level.label && (
          <>
            <h3 className="my-2 text-center font-title text-xl">
              {props.level.label}
            </h3>
            <p className="mb-3 text-center">{props.level.description}</p>
          </>
        )}
        <div
          className={
            "flex place-content-center " +
            (props.level.items.length >= 4 ? " flex-wrap space-x-2" : "")
          }
        >
          {props.level.items.map((item, index, level) => {
            const quantity = item.children?.length || -1;
            const isAllContentRead = props.isAllContentRead(
              item.label,
              quantity
            );

            return (
              <>
                <div
                  onClick={() => {
                    triggerItemSelection(item);
                  }}
                  key={item.label}
                  className={
                    "center mx-0 my-0 flex w-fit cursor-pointer overflow-hidden  rounded-md border-2 border-dark-red p-1 text-center hover:bg-white hover:shadow-md  md:p-2" +
                    (level.length >= 4 ? " mb-3" : "") +
                    (isAllContentRead ? " bg-light-orange" : " bg-brown")
                  }
                >
                  {isAllContentRead ? (
                    <span className="animate-checking">
                      <CheckIcon
                        m="auto"
                        mx="1"
                        color={"#228B22"}
                        onClick={(e) => {
                          props.checkAllContent(
                            item.label,
                            !props.isAllContentRead(
                              item.label,
                              item.children?.length || -1
                            )
                          );
                          e.stopPropagation();
                        }}
                      />
                    </span>
                  ) : (
                    <FaRegCircle
                      className="hover: m-auto mx-1 animate-checking hover:fill-light-orange hover:text-light-orange"
                      onClick={(e) => {
                        props.checkAllContent(
                          item.label,
                          !props.isAllContentRead(
                            item.label,
                            item.children?.length || -1
                          )
                        );
                        e.stopPropagation();
                      }}
                    />
                  )}
                  <p
                    className={
                      "c-dark-brown m-auto  whitespace-normal font-title text-lg md:whitespace-nowrap"
                    }
                  >
                    {item.label}
                  </p>

                  {/* <InfoIcon m="auto" mx="1" color={"#494443"} /> */}
                </div>
                {index < level.length - 1 && level.length < 4 && (
                  <div className="my-auto h-1 min-w-[10px] max-w-[20px] flex-grow border-2 border-dashed border-dark-red md:max-w-[50px]"></div>
                )}
              </>
            );
          })}
        </div>
      </div>
      {props.index < props.levelsQty - 1 && (
        <div className="flex justify-center items-center">
          <div className="my-0 h-[30px] w-1 border-2 border-dark-red"></div>
        </div>
      )}
    </article>
  );
}
