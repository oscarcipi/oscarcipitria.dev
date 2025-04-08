import MainLayout from "@/components/main-layout";

export default function MementoMori() {
  // Current age calculation (born in 1988)
  const birthYear = 1988;
  const currentYear = new Date().getFullYear();
  const currentAge = currentYear - birthYear;

  // Calculate weeks for visual representation
  const totalWeeks = 83 * 52; // 83 years * 52 weeks (Spain life expectancy)
  const passedWeeks = currentAge * 52; // Current age in weeks (approximate)
  
  // Number of dashes per row (weeks in a year)
  const weeksPerRow = 52;

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto px-4">
        <div className="font-mono text-neutral-400 mt-8 mb-4">/☠ memento mori</div>
        
        <h1 className="text-5xl font-bold text-[#ff9580] mb-6">You have to die</h1>

        <p className="text-neutral-700 dark:text-neutral-300 mb-8">
          Considering Spain life expectancy of 83 years, and that I was born in
          1988, this is a weekly divided visual representation of my sentient
          time left.
        </p>

        {/* Life weeks visualization */}
        <div className="my-12 font-mono">
          {/* Generate the grid of weeks */}
          <div className="relative">
            {/* Year markers */}
            {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80].map((year) => (
              <div key={`year-${year}`} className="absolute -right-6 text-xs text-neutral-400" style={{ top: `${(year / 83) * 100}%` }}>
                {year}
              </div>
            ))}
            
            {/* Weeks grid */}
            <div className="font-mono">
              {Array.from({ length: 83 }).map((_, yearIndex) => {
                // Calculate if this is a 5-year mark for spacing
                const year = yearIndex + 1;
                
                return (
                  <div key={`year-${yearIndex}`} className="flex flex-wrap">
                    {Array.from({ length: weeksPerRow }).map((_, weekIndex) => {
                      const weekNumber = yearIndex * weeksPerRow + weekIndex;
                      const isPassed = weekNumber < passedWeeks;
                      
                      return (
                        <span
                          key={`week-${weekNumber}`}
                          className={`inline-block ${isPassed ? "text-black dark:text-white" : "text-neutral-300 dark:text-neutral-600"}`}
                          style={{ width: '10px', height: '1px', marginRight: '1px', marginBottom: '1px' }}
                        >
                          -
                        </span>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Seneca quote */}
        <p className="text-sm italic mt-12 text-neutral-700 dark:text-neutral-300">
          "It is not that we have a short time to live, but that we waste a lot of it. Life is long enough, and a
          sufficiently generous amount has been given to us for the highest achievements if it were all
          well invested. But when it is wasted in heedless luxury and spent on no good activity, we are
          forced at last by death's final constraint to realize that it has passed away before we knew it
          was passing. So it is: we are not given a short life but we make it short, and we are not ill-
          supplied but wasteful of it... Life is long if you know how to use it." ~ Seneca
        </p>
      </div>
    </MainLayout>
  );
}
