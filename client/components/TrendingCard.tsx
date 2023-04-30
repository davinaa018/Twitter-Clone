interface TrendingCardProps {
  label?: string;
  hashtag: string;
  tweetCard?: boolean;
  tweetTitle?: string;
  tweetDescription?: string;
  numOfTweets?: string;
  peopleTweeting: string;
}

const TrendingCard = () => {
  const trendingData: TrendingCardProps[] = [
    {
      label: "Trending worldwide",
      hashtag: "BreakingNews",
      tweetCard: true,
      tweetTitle: "Space",
      tweetDescription: "Lunar photography improves the discovery of the moon",
      peopleTweeting: "10.094",
    },
    {
      label: "Trending worldwide",
      hashtag: "WorldNews",
      tweetCard: false,
      numOfTweets: "125",
      peopleTweeting: "5,094",
    },
    {
      label: "Trending worldwide",
      hashtag: "BreakingNews",
      tweetCard: true,
      tweetTitle: "Animals",
      tweetDescription: "These cats are ready for #internationalCatDay",
      peopleTweeting: "2,547",
    },
    {
      label: "Trending worldwide",
      hashtag: "GreatesOfAllTime",
      tweetCard: false,
      numOfTweets: "100",
      peopleTweeting: "4,123",
    },
  ];
  return (
    <>
      {trendingData.map((trending) => (
        <>
          <div className="flex flex-col justify-between px-4 py-2">
            <h1 className="text-sm text-zinc-500">{trending.label}</h1>
            <h1 className="text-md font-bold pb-2 text-white">
              #{trending.hashtag}
            </h1>

            {trending.tweetCard ? (
              <div className="border border-white/20 rounded-lg px-3 py-2">
                <h1 className="text-sm text-zinc-500">{trending.tweetTitle}</h1>
                <p className="text-white text-sm">
                  {trending.tweetDescription}
                </p>
              </div>
            ) : (
              <p className="text-sm text-zinc-500">
                {trending.numOfTweets}k Tweets
              </p>
            )}

            <p className="text-sm text-zinc-500 pt-2">
              {trending.peopleTweeting}
              {""} people are Tweeting about this
            </p>
          </div>
          <hr className="w-full border border-zinc-500/30" />
        </>
      ))}
    </>
  );
};

export default TrendingCard;
