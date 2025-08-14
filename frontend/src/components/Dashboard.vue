<script setup lang="ts">
import { ref, onMounted } from "vue";
import VaultTitle from "../components/VaultTitle.vue";
import QuoteOfTheDay from "./QuoteOfTheDay.vue";
const searchQuery = ref("");
const selectedFilter = ref("");
const todayDate = ref("");
const currentTime = ref("");

onMounted(() => {
  // Set date (formatted)
  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("en", { month: "short" });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const date = new Date();

  todayDate.value = formatDate(date);

  // Update time every second
  const updateTime = () => {
    const now = new Date();
    currentTime.value = now.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  updateTime();
  setInterval(updateTime, 1000);
});
</script>

<template>
  <div class="dashboard">
    <div class="dashboard__card">
      <!-- Sidebar inside card -->
      <aside class="dashboard__sidebar">
        <VaultTitle
          fontSize="32px"
          :animate="false"
          gap="5px"
          class="dashboard__vaultTitle"
        />

        <div class="dashboard__brand">My Dashboard</div>
        <nav class="dashboard__nav">
          <ul class="dashboard__nav-list">
            <li class="dashboard__nav-item">
              <a href="#" class="dashboard__nav-link">
                <i
                  class="fas fa-home dashboard__nav-icon"
                  aria-hidden="true"
                ></i>
                Home
              </a>
            </li>

            <li class="dashboard__nav-item">
              <a href="#" class="dashboard__nav-link">
                <i
                  class="fas fa-users dashboard__nav-icon"
                  aria-hidden="true"
                ></i>
                Users
              </a>
            </li>
            <li class="dashboard__nav-item">
              <a href="#" class="dashboard__nav-link">
                <i
                  class="fas fa-cog dashboard__nav-icon"
                  aria-hidden="true"
                ></i>
                Settings
              </a>
            </li>
            <li class="dashboard__nav-item">
              <a href="#" class="dashboard__nav-link">
                <i
                  class="fas fa-user dashboard__nav-icon"
                  aria-hidden="true"
                ></i>
                Profile
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <!-- Main content -->
      <div class="dashboard__content">
        <div class="dashboard__search-filter">
          <div class="dashboard__search-row">
            <!-- Search + filter -->
            <div class="dashboard__search-wrapper">
              <select v-model="selectedFilter" class="dashboard__filter-inside">
                <option value="">All</option>
                <option value="users">Title</option>
                <option value="settings">Author</option>
                <option value="profile">Genre</option>
              </select>
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Search..."
                class="dashboard__search-inside"
              />
              <i class="fas fa-search dashboard__search-icon"></i>
            </div>

            <!-- Date display -->
            <div class="dashboard__display-box">
              <div class="dashboard__display-box--time">
                <i class="fas fa-clock"></i>
                <span>{{ currentTime }}</span>
              </div>
              <div class="dashboard__display-box--date">
                <i class="fas fa-calendar-alt"></i>
                <span>{{ todayDate }}</span>
              </div>
            </div>

            <!-- Time display -->
          </div>
          <div class="dashboard__quotes">
            <div class="dashboard__display-box">
              <i class="fas fa-quote-left"></i>
              <QuoteOfTheDay />
              <i class="fas fa-quote-right"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  &__vaultTitle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 1.5rem;
  }
  &__card {
    display: flex;
    width: 95vw;
    height: 95vh;
    background-color: #f3f3f7;
    border-radius: 1.5rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  &__nav-icon {
    margin-right: 0.5rem;
    font-size: 1.1rem;
    color: #fa7c54;
    vertical-align: middle;
  }
  &__quotes {
    margin-top: 1rem;
  }
  &__sidebar {
    width: 250px;
    background-color: #ffffff; // dark gray
    color: #4d4d4d;
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    & .dashboard__brand {
      font-size: 1.75rem;
      font-weight: bold;
      text-align: center;
      margin-bottom: 2rem;
    }

    & .dashboard__nav-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    & .dashboard__nav-link {
      color: #d1d5db;
      text-decoration: none;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      transition: background-color 0.3s, color 0.3s;

      &:hover {
        color: #fa7c54;
      }
    }
  }

  &__content {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
  }
  .dashboard__search-row {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  /* Common display box style */
  .dashboard__display-box {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 0.5rem 1rem;
    border-radius: 0.9rem;
    align-content: center;
    background-color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    white-space: nowrap;
    justify-content: center;
    // font-family: "Share Tech Mono", monospace;
    // font-weight: 400;
    // font-style: normal;
    font-family: "VT323", monospace;
    font-weight: 400;
    font-style: normal;
    color: #4d4d4d;
    &--time,
    &--date {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 20px;
    }

    i {
      color: #fa7c54;
      font-size: 1rem;
    }
  }

  /* Search wrapper styling */
  .dashboard__search-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    flex: 1;
    border-radius: 0.9rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    background-color: #fff;
  }

  .dashboard__filter-inside {
    position: absolute;
    left: 0;
    height: 100%;
    border: none;
    border-radius: 0;
    background-color: #f3f3f7;
    padding: 0 0.5rem;
    font-size: 1rem;
    z-index: 2;
    cursor: pointer;
  }

  .dashboard__search-inside {
    flex: 1;
    padding: 0.5rem 2.5rem 0.5rem 100px;
    border: none;
    font-size: 1rem;

    &:focus {
      outline: none;
    }
  }

  .dashboard__search-icon {
    position: absolute;
    right: 0.8rem;
    font-size: 1rem;
    color: #888;
    pointer-events: none;
  }

  .dashboard__search-icon {
    position: absolute;
    right: 0.8rem;
    font-size: 1rem;
    color: #fa7c54;
    pointer-events: none;
  }
  // Responsive adjustments
  @media (max-width: 768px) {
    .dashboard__search-filter {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
  &__title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }

  &__welcome {
    font-size: 1rem;
    color: #4b5563; // gray-700
    margin-bottom: 1rem;
  }
}

// Responsive
@media (max-width: 768px) {
  .dashboard__card {
    flex-direction: column;
  }

  .dashboard__sidebar {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }
}
</style>
